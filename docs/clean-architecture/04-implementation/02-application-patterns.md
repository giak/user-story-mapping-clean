# Patterns de la Couche Application 🔄

## Vue d'ensemble

Les patterns de la couche application définissent comment orchestrer les interactions entre la couche présentation et la couche domaine. Ces patterns se concentrent sur la coordination des flux de données et la gestion des cas d'utilisation sans contenir de logique métier.

## Patterns Principaux

### 1. Pattern Use Case (Cas d'Utilisation) 📋

Le pattern Use Case encapsule une opération métier spécifique et orchestre les interactions entre les différentes couches.

```typescript
export interface UseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<Result<TResponse>>;
}

export class CreateStoryUseCase implements UseCase<CreateStoryDTO, StoryDTO> {
  constructor(
    private readonly storyRepository: StoryRepositoryInterface,
    private readonly storyFactory: StoryFactoryInterface,
    private readonly eventBus: EventBusInterface
  ) {}

  async execute(request: CreateStoryDTO): Promise<Result<StoryDTO>> {
    // 1. Validation de la requête
    const validationResult = await this.validateRequest(request);
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }

    // 2. Création de l'entité via factory
    const storyResult = await this.storyFactory.create({
      title: request.title,
      description: request.description,
      points: request.points
    });

    if (storyResult.isFailure) {
      return Result.fail(storyResult.error);
    }

    // 3. Persistence
    const saveResult = await this.storyRepository.save(storyResult.value);
    if (saveResult.isFailure) {
      return Result.fail(saveResult.error);
    }

    // 4. Publication de l'événement
    await this.eventBus.publish(new StoryCreatedEvent(saveResult.value));

    // 5. Retour du DTO
    return Result.ok(StoryMapper.toDTO(saveResult.value));
  }

  private async validateRequest(request: CreateStoryDTO): Promise<Result<void>> {
    const validator = new CreateStoryValidator();
    return validator.validate(request);
  }
}
```

### 2. Pattern DTO (Objet de Transfert de Données) 📦

Les DTOs définissent la structure des données échangées entre les couches.

```typescript
// DTOs de base
export interface BaseStoryDTO {
  id: string;
  title: string;
  status: StoryStatus;
}

// DTO pour la création
export interface CreateStoryDTO {
  title: string;
  description: string;
  points: number;
}

// DTO pour la mise à jour
export interface UpdateStoryDTO {
  id: string;
  title?: string;
  description?: string;
  points?: number;
  status?: StoryStatus;
}

// DTO détaillé
export interface StoryDetailDTO extends BaseStoryDTO {
  description: string;
  points: number;
  assignee?: UserReferenceDTO;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// DTO de référence
export interface StoryReferenceDTO {
  id: string;
  title: string;
}
```

### 3. Pattern Service d'Application 🔄

Les services d'application orchestrent des opérations complexes impliquant plusieurs use cases ou agrégats.

```typescript
export class StoryApplicationService {
  constructor(
    private readonly storyRepository: StoryRepositoryInterface,
    private readonly sprintRepository: SprintRepositoryInterface,
    private readonly eventBus: EventBusInterface
  ) {}

  async moveStoryToSprint(
    storyId: string,
    sprintId: string
  ): Promise<Result<void>> {
    // 1. Récupération des entités
    const storyResult = await this.storyRepository.findById(storyId);
    const sprintResult = await this.sprintRepository.findById(sprintId);

    if (storyResult.isFailure) return Result.fail(storyResult.error);
    if (sprintResult.isFailure) return Result.fail(sprintResult.error);

    const story = storyResult.value;
    const sprint = sprintResult.value;

    // 2. Vérification des règles métier
    if (!story.canBeMovedToSprint()) {
      return Result.fail(new ApplicationError("La story ne peut pas être déplacée vers le sprint"));
    }

    if (!sprint.canAcceptStory(story)) {
      return Result.fail(new ApplicationError("Le sprint ne peut pas accepter la story"));
    }

    // 3. Exécution des opérations
    const moveResult = await this.executeMove(story, sprint);
    if (moveResult.isFailure) return Result.fail(moveResult.error);

    // 4. Notification du changement
    await this.eventBus.publish(
      new StoryMovedToSprintEvent(storyId, sprintId)
    );

    return Result.ok();
  }

  private async executeMove(
    story: StoryEntity,
    sprint: SprintEntity
  ): Promise<Result<void>> {
    // Transaction ou saga pattern si nécessaire
    return this.storyRepository.update(story.id, { sprintId: sprint.id });
  }
}
```

### 4. Pattern Événement 📢

Gestion des événements applicatifs pour la communication entre composants.

```typescript
// Définition des événements
export interface ApplicationEvent {
  readonly type: string;
  readonly timestamp: Date;
  readonly metadata?: Record<string, unknown>;
}

export class StoryCreatedEvent implements ApplicationEvent {
  readonly type = "STORY.CREATED";
  readonly timestamp: Date;

  constructor(
    public readonly story: StoryDTO,
    metadata?: Record<string, unknown>
  ) {
    this.timestamp = new Date();
    this.metadata = metadata;
  }
}

// Gestionnaire d'événements
export class StoryEventHandler {
  constructor(
    private readonly notificationService: NotificationServiceInterface,
    private readonly analyticsService: AnalyticsServiceInterface
  ) {}

  async handleStoryCreated(event: StoryCreatedEvent): Promise<void> {
    // Notification des utilisateurs
    await this.notificationService.notifyStoryCreated(event.story);

    // Mise à jour des analytics
    await this.analyticsService.trackStoryCreated(event.story);
  }
}

// Configuration des gestionnaires
export function setupStoryEventHandlers(
  eventBus: EventBusInterface,
  handler: StoryEventHandler
): void {
  eventBus.subscribe("STORY.CREATED", handler.handleStoryCreated.bind(handler));
}
```

### 5. Pattern Validateur ✅

Validation des données entrantes au niveau application.

```typescript
export interface Validator<T> {
  validate(data: T): Promise<Result<void>>;
}

export class CreateStoryValidator implements Validator<CreateStoryDTO> {
  async validate(data: CreateStoryDTO): Promise<Result<void>> {
    const schema = z.object({
      title: z.string()
        .min(3, "Le titre doit contenir au moins 3 caractères")
        .max(100, "Le titre ne doit pas dépasser 100 caractères"),
      description: z.string()
        .min(10, "La description doit contenir au moins 10 caractères")
        .max(1000, "La description ne doit pas dépasser 1000 caractères"),
      points: z.number()
        .int("Les points doivent être un nombre entier")
        .min(1, "Les points doivent être au moins de 1")
        .max(21, "Les points ne doivent pas dépasser 21")
    });

    try {
      await schema.parseAsync(data);
      return Result.ok();
    } catch (error) {
      return Result.fail(new ValidationError("Données de story invalides", error));
    }
  }
}
```

## Bonnes Pratiques 🎯

### 1. Séparation des Responsabilités

```typescript
// ✅ Bon : Use case focalisé
export class CreateStoryUseCase {
  async execute(request: CreateStoryDTO): Promise<Result<StoryDTO>> {
    // Validation et création uniquement
  }
}

// ❌ Mauvais : Use case avec trop de responsabilités
export class StoryUseCase {
  async createStory() { /* ... */ }
  async updateStory() { /* ... */ }
  async deleteStory() { /* ... */ }
}
```

### 2. Gestion des Erreurs

```typescript
// ✅ Bon : Gestion explicite des erreurs
export class UpdateStoryUseCase {
  async execute(request: UpdateStoryDTO): Promise<Result<StoryDTO>> {
    const validationResult = await this.validate(request);
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }
    // ...
  }
}

// ❌ Mauvais : Erreurs non gérées
export class UpdateStoryUseCase {
  async execute(request: UpdateStoryDTO): Promise<StoryDTO> {
    const story = await this.repository.findById(request.id);
    // Que se passe-t-il si story n'existe pas ?
    return this.mapper.toDTO(story);
  }
}
```

### 3. DTOs Spécifiques

```typescript
// ✅ Bon : DTOs spécifiques aux cas d'utilisation
export interface CreateStoryDTO {
  title: string;
  description: string;
}

export interface UpdateStoryStatusDTO {
  id: string;
  status: StoryStatus;
}

// ❌ Mauvais : DTO générique
export interface StoryDTO {
  // Tous les champs possibles
  [key: string]: any;
}
```

## Anti-Patterns à Éviter ⚠️

### 1. Logique Métier dans la Couche Application

```typescript
// ❌ Mauvais : Règles métier dans le use case
export class CompleteStoryUseCase {
  execute(id: string) {
    const story = await this.repository.findById(id);
    if (story.points > 13 || !story.hasTests) {
      return Result.fail(new Error("Impossible de terminer la story"));
    }
  }
}

// ✅ Bon : Règles métier dans le domaine
export class CompleteStoryUseCase {
  execute(id: string) {
    const story = await this.repository.findById(id);
    if (!story.canBeCompleted()) {
      return Result.fail(new Error("Impossible de terminer la story"));
    }
  }
}
```

### 2. Couplage Direct avec l'Infrastructure

```typescript
// ❌ Mauvais : Dépendance directe
export class StoryUseCase {
  constructor(private readonly axios: AxiosInstance) {}
}

// ✅ Bon : Dépendance via interface
export class StoryUseCase {
  constructor(
    private readonly repository: StoryRepositoryInterface
  ) {}
}
```

### 3. État dans les Use Cases

```typescript
// ❌ Mauvais : État dans le use case
export class StoryUseCase {
  private cachedStories: Story[] = [];
  
  async getStories() {
    if (this.cachedStories.length) {
      return this.cachedStories;
    }
    // ...
  }
}

// ✅ Bon : Use case sans état
export class GetStoriesUseCase {
  async execute(): Promise<Result<Story[]>> {
    return this.repository.findAll();
  }
}
```

## Directives de la Couche Application 📋

1. Maintenir la couche application comme une couche d'orchestration pure
2. Déléguer toute la logique métier à la couche domaine
3. Utiliser des DTOs pour l'échange de données entre les couches
4. Implémenter une gestion robuste des erreurs
5. Éviter tout état mutable dans les use cases
6. Favoriser l'injection de dépendances via des interfaces
