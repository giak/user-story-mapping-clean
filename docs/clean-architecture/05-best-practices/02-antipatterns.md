# Anti-Patterns à Éviter ⚠️

## Vue d'ensemble

Les anti-patterns sont des pratiques courantes mais inefficaces ou contre-productives qui doivent être évitées pour maintenir la qualité et la maintenabilité du code.

## Anti-Patterns Principaux

### 1. God Object (Objet Dieu) 🏛️

Le "God Object" est un objet qui en fait trop, connaît trop, ou contrôle trop de choses.

```typescript
// ❌ Mauvais : Classe qui fait tout
export class GestionnaireStory {
  private repository: StoryRepository;
  private validator: StoryValidator;
  private notifier: NotificationService;
  private analytics: AnalyticsService;

  async createStory(data: CreateStoryDTO) { /* ... */ }
  async updateStory(data: UpdateStoryDTO) { /* ... */ }
  async deleteStory(id: string) { /* ... */ }
  async assignStory(storyId: string, userId: string) { /* ... */ }
  async moveToSprint(storyId: string, sprintId: string) { /* ... */ }
  async calculateMetrics() { /* ... */ }
  async generateReport() { /* ... */ }
  async notifyUsers() { /* ... */ }
  // ... et beaucoup d'autres méthodes
}

// ✅ Bon : Responsabilités séparées
export class CreateStoryUseCase {
  constructor(
    private readonly repository: StoryRepositoryInterface,
    private readonly validator: StoryValidatorInterface
  ) {}

  async execute(data: CreateStoryDTO): Promise<Result<StoryDTO>> {
    // Logique spécifique à la création
  }
}

export class AssignStoryUseCase {
  constructor(
    private readonly repository: StoryRepositoryInterface,
    private readonly notifier: NotificationServiceInterface
  ) {}

  async execute(storyId: string, userId: string): Promise<Result<void>> {
    // Logique spécifique à l'assignation
  }
}
```

### 2. Modèle de Domaine Anémique 🧪

Modèles de domaine sans comportement, réduits à de simples conteneurs de données.

```typescript
// ❌ Mauvais : Modèle anémique
export class Story {
  public id: string;
  public titre: string;
  public description: string;
  public statut: string;
  public points: number;

  public setTitre(titre: string): void {
    this.titre = titre;
  }

  public setStatut(statut: string): void {
    this.statut = statut;
  }
}

// ✅ Bon : Modèle riche avec comportement
export class Story extends AggregateRoot<StoryId> {
  private constructor(private readonly props: StoryProps) {
    super();
  }

  public static create(props: StoryProps): Result<Story> {
    // Validation et logique de création
    if (!props.titre || props.titre.length < 3) {
      return Result.fail(new ValidationError("Titre trop court"));
    }
    return Result.ok(new Story(props));
  }

  public updateStatut(nouveauStatut: StoryStatus): Result<void> {
    if (!this.peutTransitionnerVers(nouveauStatut)) {
      return Result.fail(new DomainError("Transition de statut invalide"));
    }

    this.props.statut = nouveauStatut;
    this.addDomainEvent(new StoryStatusChangedEvent(this.id, nouveauStatut));
    return Result.ok();
  }

  private peutTransitionnerVers(nouveauStatut: StoryStatus): boolean {
    // Logique de validation des transitions d'état
    return this.props.statut.peutTransitionnerVers(nouveauStatut);
  }
}
```

### 3. Shotgun Surgery (Chirurgie au Fusil) 🔫

Modifications qui nécessitent des changements dans de nombreux endroits différents.

```typescript
// ❌ Mauvais : Logique dispersée
export class StoryComponent {
  updateStatut(statut: string) {
    this.statut = statut;
    this.updateUI();
    this.updateDatabase();
    this.notifyUsers();
    this.updateAnalytics();
    // ... et plus encore
  }
}

export class SprintComponent {
  moveStory(storyId: string) {
    this.updateStoryStatut(storyId);
    this.updateUI();
    this.updateDatabase();
    this.notifyUsers();
    this.updateAnalytics();
    // ... les mêmes opérations
  }
}

// ✅ Bon : Logique centralisée
export class UpdateStoryStatusUseCase {
  constructor(
    private readonly repository: StoryRepositoryInterface,
    private readonly eventBus: EventBusInterface
  ) {}

  async execute(storyId: string, statut: string): Promise<Result<void>> {
    const story = await this.repository.findById(storyId);
    if (story.isFailure) return Result.fail(story.error);

    const updateResult = story.value.updateStatut(statut);
    if (updateResult.isFailure) return Result.fail(updateResult.error);

    await this.repository.save(story.value);
    await this.eventBus.publish(new StoryStatusUpdatedEvent(storyId, statut));

    return Result.ok();
  }
}
```

### 4. Feature Envy (Envie de Fonctionnalité) 👀

Code qui est plus intéressé par les données d'une autre classe que par ses propres données.

```typescript
// ❌ Mauvais : Feature Envy
export class CalculateurPointsStory {
  calculatePoints(story: Story): number {
    let points = 0;
    if (story.getComplexite() === "HAUTE") {
      points += 5;
    }
    if (story.getDependances().length > 0) {
      points += story.getDependances().length * 2;
    }
    if (story.getCompetencesRequises().includes("BACKEND")) {
      points += 3;
    }
    return points;
  }
}

// ✅ Bon : Comportement dans la classe appropriée
export class Story extends AggregateRoot<StoryId> {
  public calculatePoints(): number {
    let points = this.pointsBase;
    
    if (this.estHauteComplexite()) {
      points += this.pointsComplexite;
    }
    
    points += this.calculatePointsDependances();
    points += this.calculatePointsCompetences();
    
    return points;
  }

  private calculatePointsDependances(): number {
    return this.dependances.length * this.pointsParDependance;
  }

  private calculatePointsCompetences(): number {
    return this.competencesRequises
      .filter(competence => competence.estSpecialisee())
      .reduce((total, competence) => total + competence.points, 0);
  }
}
```

### 5. Obsession des Types Primitifs 🔢

Utilisation excessive des types primitifs au lieu d'objets de domaine.

```typescript
// ❌ Mauvais : Utilisation de primitifs
export class Story {
  constructor(
    public id: string,
    public titre: string,
    public statut: string,
    public points: number,
    public priorite: number
  ) {}

  estHautePriorite(): boolean {
    return this.priorite > 7;  // Nombre magique
  }

  peutEtreTerminee(): boolean {
    return this.statut !== "BLOQUEE" && this.points <= 13;
  }
}

// ✅ Bon : Utilisation d'objets valeur
export class Story extends AggregateRoot<StoryId> {
  constructor(
    id: StoryId,
    titre: StoryTitle,
    statut: StoryStatus,
    points: StoryPoints,
    priorite: Priority
  ) {
    super(id);
    this.titre = titre;
    this.statut = statut;
    this.points = points;
    this.priorite = priorite;
  }

  estHautePriorite(): boolean {
    return this.priorite.estHaute();
  }

  peutEtreTerminee(): boolean {
    return !this.statut.estBloquee() && this.points.estDansCapaciteSprint();
  }
}

export class Priority extends ValueObject<{ value: number }> {
  public static readonly SEUIL_HAUTE = 7;

  private constructor(props: { value: number }) {
    super(props);
    this.validate();
  }

  public static create(value: number): Result<Priority> {
    if (value < 1 || value > 10) {
      return Result.fail(new ValidationError("La priorité doit être entre 1 et 10"));
    }
    return Result.ok(new Priority({ value }));
  }

  public estHaute(): boolean {
    return this.props.value >= Priority.SEUIL_HAUTE;
  }
}
```

### 6. Couplage Temporel ⏱️

Dépendance implicite sur l'ordre d'exécution des méthodes.

```typescript
// ❌ Mauvais : Couplage temporel
export class CreateurStory {
  private story: Story;

  setTitre(titre: string) {
    this.story.titre = titre;
  }

  setDescription(description: string) {
    this.story.description = description;
  }

  setPoints(points: number) {
    this.story.points = points;
  }

  save() {
    // Que se passe-t-il si les setters n'ont pas été appelés ?
    return this.repository.save(this.story);
  }
}

// ✅ Bon : Construction atomique
export class CreateStoryUseCase {
  async execute(dto: CreateStoryDTO): Promise<Result<Story>> {
    const storyResult = Story.create({
      titre: dto.titre,
      description: dto.description,
      points: dto.points
    });

    if (storyResult.isFailure) {
      return Result.fail(storyResult.error);
    }

    return this.repository.save(storyResult.value);
  }
}
```

## Impact des Anti-Patterns 📊

1. **Maintenabilité Réduite**
   - Code difficile à comprendre
   - Modifications risquées
   - Dette technique accrue

2. **Tests Complexes**
   - Dépendances difficiles à mocker
   - Scénarios de test compliqués
   - Couverture insuffisante

3. **Performance Dégradée**
   - Opérations redondantes
   - Utilisation inefficace des ressources
   - Problèmes de scalabilité

4. **Bugs Fréquents**
   - États incohérents
   - Effets de bord inattendus
   - Comportements imprévisibles

## Solutions et Bonnes Pratiques 🎯

1. **Principes SOLID**
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation Principle
   - Dependency Inversion Principle

2. **Design Patterns Appropriés**
   - Factory Pattern pour la création d'objets
   - Repository Pattern pour la persistance
   - Strategy Pattern pour les algorithmes variables

3. **Tests Rigoureux**
   - Tests unitaires pour chaque comportement
   - Tests d'intégration pour les interactions
   - Tests de bout en bout pour les scénarios critiques

4. **Revue de Code**
   - Identification précoce des anti-patterns
   - Partage des bonnes pratiques
   - Amélioration continue du code

## Directives pour Éviter les Anti-Patterns 📋

1. Favoriser la composition plutôt que l'héritage
2. Maintenir des classes et méthodes de petite taille
3. Suivre le principe de responsabilité unique
4. Utiliser des objets valeur pour les concepts du domaine
5. Éviter les dépendances cachées
6. Documenter les décisions de conception importantes
7. Effectuer des revues de code régulières
8. Refactoriser progressivement le code existant
