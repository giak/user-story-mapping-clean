# Patterns du Domaine 🏛️

## Vue d'ensemble

Les patterns du domaine sont des modèles de conception spécifiques à la couche domaine qui nous aident à implémenter et organiser la logique métier de manière efficace et maintenable. Ces patterns constituent le cœur de notre implémentation Clean Architecture.

## Patterns Principaux du Domaine

### 1. Pattern Entity (Entité) 📦

Les entités sont des objets qui ont une identité unique et qui encapsulent leur logique métier.

```typescript
export interface EntityInterface<T> {
  readonly id: T;
  equals(other: EntityInterface<T>): boolean;
}

export abstract class Entity<T> implements EntityInterface<T> {
  constructor(
    protected readonly props: any, 
    private readonly _id: T
  ) {
    Object.freeze(this);
  }

  get id(): T {
    return this._id;
  }

  public equals(other: EntityInterface<T>): boolean {
    if (!other) return false;
    return this._id === other.id;
  }
}

// Exemple d'utilisation
interface StoryProps {
  title: string;
  description: string;
  status: StoryStatus;
  isBlocked: boolean;
}

export class Story extends Entity<StoryId> {
  private constructor(props: StoryProps, id: StoryId) {
    super(props, id);
  }

  public static create(props: StoryProps): Result<Story> {
    // Validation
    if (!props.title || props.title.length < 3) {
      return Result.fail<Story>(new ValidationError("Titre trop court"));
    }

    return Result.ok<Story>(new Story(props, StoryId.create()));
  }

  get title(): string { return this.props.title; }
  get description(): string { return this.props.description; }
  get status(): StoryStatus { return this.props.status; }

  public canBeEstimated(): boolean {
    return this.status.isNew() && !this.props.isBlocked;
  }
}
```

### 2. Pattern Value Object (Objet Valeur) 💎

Les Value Objects sont des objets immuables qui représentent des concepts du domaine sans identité propre.

```typescript
export interface ValueObjectProps {
  [key: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze({ ...props });
  }

  public equals(other: ValueObject<T>): boolean {
    if (!other) return false;
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}

// Exemple d'utilisation
export class StoryPoints extends ValueObject<{ value: number }> {
  private static readonly VALID_POINTS = [1, 2, 3, 5, 8, 13, 21];

  private constructor(props: { value: number }) {
    super(props);
  }

  public static create(points: number): Result<StoryPoints> {
    if (!StoryPoints.VALID_POINTS.includes(points)) {
      return Result.fail<StoryPoints>(new InvalidPointsError(points));
    }
    return Result.ok<StoryPoints>(new StoryPoints({ value: points }));
  }

  get value(): number {
    return this.props.value;
  }

  public isHighEffort(): boolean {
    return this.props.value > 8;
  }
}
```

### 3. Pattern Aggregate (Agrégat) 🎯

Les Agrégats définissent des frontières de cohérence et encapsulent des groupes d'entités liées.

```typescript
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}

// Exemple d'utilisation
export class Epic extends AggregateRoot<EpicId> {
  private readonly _stories: Story[] = [];

  private constructor(props: EpicProps, id: EpicId) {
    super(props, id);
  }

  public static create(props: EpicProps): Result<Epic> {
    // Logique de validation
    return Result.ok<Epic>(new Epic(props, EpicId.create()));
  }

  public addStory(story: Story): Result<void> {
    if (this._stories.length >= 20) {
      return Result.fail<void>(new EpicFullError());
    }

    this._stories.push(story);
    this.addDomainEvent(new StoryAddedToEpicEvent(this.id, story.id));
    return Result.ok<void>();
  }

  public get stories(): readonly Story[] {
    return Object.freeze([...this._stories]);
  }

  public getTotalPoints(): number {
    return this._stories.reduce((sum, story) => 
      sum + story.points.value, 0);
  }
}
```

### 4. Pattern Repository (Dépôt) 🗄️

Définit le contrat pour l'accès aux données sans détails d'implémentation.

```typescript
export interface RepositoryInterface<T extends Entity<any>> {
  findById(id: string | number): Promise<Result<T>>;
  findAll(): Promise<Result<T[]>>;
  save(entity: T): Promise<Result<void>>;
  delete(entity: T): Promise<Result<void>>;
}

// Exemple d'utilisation
export interface StoryRepositoryInterface extends RepositoryInterface<Story> {
  findByEpicId(epicId: string): Promise<Result<Story[]>>;
  findUnassigned(): Promise<Result<Story[]>>;
}
```

### 5. Pattern Service de Domaine 🔧

Encapsule la logique métier qui ne s'intègre pas naturellement dans les entités.

```typescript
export interface StoryPrioritizationService {
  prioritizeBacklog(stories: Story[]): Result<Story[]>;
  calculatePriorityScore(story: Story): number;
}

// Exemple d'implémentation
export class StoryPrioritizationServiceImpl implements StoryPrioritizationService {
  public prioritizeBacklog(stories: Story[]): Result<Story[]> {
    try {
      return Result.ok(
        [...stories].sort((a, b) => 
          this.calculatePriorityScore(b) - this.calculatePriorityScore(a))
      );
    } catch (error) {
      return Result.fail(new PrioritizationError(error.message));
    }
  }

  public calculatePriorityScore(story: Story): number {
    return story.businessValue * 0.4 +
           story.urgency * 0.3 +
           story.risk * 0.3;
  }
}
```

## Bonnes Pratiques 🎯

### 1. Immutabilité

```typescript
// ✅ Bon : Objet immutable
export class StoryTitle extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
    Object.freeze(this);
  }

  public static create(value: string): Result<StoryTitle> {
    return Result.ok(new StoryTitle({ value }));
  }
}

// ❌ Mauvais : Objet mutable
export class StoryTitle {
  private _value: string;
  
  setValue(value: string): void {
    this._value = value; // État mutable !
  }
}
```

### 2. Encapsulation Forte

```typescript
// ✅ Bon : Encapsulation forte
export class Story extends Entity<StoryId> {
  private readonly _status: StoryStatus;
  
  public canBeCompleted(): boolean {
    return this._status.canTransitionTo(StoryStatus.DONE);
  }
}

// ❌ Mauvais : Exposition des détails internes
export class Story {
  public status: string; // État interne exposé !
  public rules: any[];  // Détails d'implémentation exposés !
}
```

### 3. Événements du Domaine

```typescript
// ✅ Bon : Événements du domaine pour les effets de bord
export class Story extends AggregateRoot<StoryId> {
  public complete(): Result<void> {
    if (!this.canBeCompleted()) {
      return Result.fail(new InvalidOperationError());
    }
    
    this._status = StoryStatus.DONE;
    this.addDomainEvent(new StoryCompletedEvent(this.id));
    return Result.ok();
  }
}
```

## Anti-Patterns à Éviter ⚠️

### 1. Modèle de Domaine Anémique

```typescript
// ❌ Mauvais : Modèle anémique
export class Story {
  public title: string;
  public points: number;
  
  setTitle(title: string): void {
    this.title = title;
  }
}

// ✅ Bon : Modèle de domaine riche
export class Story extends Entity<StoryId> {
  private constructor(props: StoryProps) {
    super(props);
  }

  public updateTitle(title: string): Result<void> {
    if (title.length < 3) {
      return Result.fail(new ValidationError("Titre trop court"));
    }
    this.props.title = title;
    this.addDomainEvent(new StoryTitleUpdatedEvent(this.id, title));
    return Result.ok();
  }
}
```

### 2. Logique Métier Hors du Domaine

```typescript
// ❌ Mauvais : Logique métier dans le service
export class StoryService {
  canCompleteStory(story: Story): boolean {
    return story.points > 0 && story.hasTests;
  }
}

// ✅ Bon : Logique métier dans l'entité
export class Story extends Entity<StoryId> {
  public canBeCompleted(): boolean {
    return this.points.value > 0 && this.hasTests();
  }
}
```

### 3. Obsession des Types Primitifs

```typescript
// ❌ Mauvais : Utilisation de types primitifs
export class Story {
  private status: string;
  private points: number;
}

// ✅ Bon : Utilisation d'objets valeur
export class Story extends Entity<StoryId> {
  private readonly status: StoryStatus;
  private readonly points: StoryPoints;
}
```

## Directives de la Couche Domaine 📋

1. Maintenir la couche domaine indépendante des préoccupations externes
2. Utiliser des objets valeur pour tous les concepts du domaine
3. Implémenter des modèles de domaine riches avec comportement
4. Utiliser des événements de domaine pour les effets de bord
5. Appliquer les invariants aux frontières des agrégats
6. Rendre les états invalides impossibles à représenter via le système de types


