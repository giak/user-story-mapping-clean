# Principes d'Implémentation de la Clean Architecture 📐

## Principes SOLID 🏛️

### 1. Single Responsibility Principle (SRP) 🎯

Le principe de responsabilité unique stipule qu'une classe ne doit avoir qu'une seule raison de changer.

```typescript
// ❌ Mauvais : Multiples responsabilités
class Story {
    private database: Database;
    
    save() { /* Logique de persistance */ }
    validate() { /* Logique de validation */ }
    format() { /* Logique de formatage */ }
}

// ✅ Bon : Responsabilités séparées
class Story {
    validate() { /* Validation métier uniquement */ }
}

class StoryRepository {
    save(story: Story) { /* Persistance */ }
}

class StoryFormatter {
    format(story: Story) { /* Formatage */ }
}
```

### 2. Open/Closed Principle (OCP) 🔓

Les entités logicielles doivent être ouvertes à l'extension mais fermées à la modification.

```typescript
// ✅ Bon : Extension sans modification
interface ValidationRule {
    validate(value: unknown): boolean;
}

class RequiredRule implements ValidationRule {
    validate(value: unknown): boolean {
        return value !== null && value !== undefined;
    }
}

class MinLengthRule implements ValidationRule {
    constructor(private minLength: number) {}
    
    validate(value: string): boolean {
        return value.length >= this.minLength;
    }
}
```

### 3. Liskov Substitution Principle (LSP) 🔄

Les objets d'une classe dérivée doivent pouvoir remplacer les objets de la classe de base.

```typescript
// ✅ Bon : Substitution valide
abstract class Entity<T> {
    abstract validate(): Result<void>;
}

class Story extends Entity<StoryId> {
    validate(): Result<void> {
        // Validation spécifique respectant le contrat
        return Result.ok();
    }
}
```

### 4. Interface Segregation Principle (ISP) 📋

Les clients ne doivent pas dépendre d'interfaces qu'ils n'utilisent pas.

```typescript
// ❌ Mauvais : Interface trop large
interface StoryRepository {
    save(story: Story): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Story>;
    findAll(): Promise<Story[]>;
    update(story: Story): Promise<void>;
    search(criteria: SearchCriteria): Promise<Story[]>;
}

// ✅ Bon : Interfaces séparées
interface StoryReader {
    findById(id: string): Promise<Story>;
    search(criteria: SearchCriteria): Promise<Story[]>;
}

interface StoryWriter {
    save(story: Story): Promise<void>;
    update(story: Story): Promise<void>;
}
```

### 5. Dependency Inversion Principle (DIP) 🔌

Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau.

```typescript
// ❌ Mauvais : Dépendance directe
class StoryService {
    private repository = new MongoStoryRepository();
}

// ✅ Bon : Dépendance inversée
class StoryService {
    constructor(
        private repository: StoryRepositoryInterface
    ) {}
}
```

## Patterns d'Implémentation 🎨

### 1. Repository Pattern 📦

Abstraction de la couche de persistance.

```typescript
// Interface dans la couche domaine
interface StoryRepository {
    save(story: Story): Promise<Result<void>>;
    findById(id: StoryId): Promise<Result<Story>>;
}

// Implémentation dans la couche infrastructure
class MongoStoryRepository implements StoryRepository {
    async save(story: Story): Promise<Result<void>> {
        try {
            await this.collection.insertOne(story);
            return Result.ok();
        } catch (error) {
            return Result.fail(error);
        }
    }
}
```

### 2. Factory Pattern 🏭

Création d'objets complexes.

```typescript
class StoryFactory {
    static create(props: StoryProps): Result<Story> {
        // Validation
        if (!props.title) {
            return Result.fail('Title is required');
        }

        // Création
        return Result.ok(new Story({
            id: new StoryId(),
            title: props.title,
            description: props.description,
            points: new StoryPoints(props.points)
        }));
    }
}
```

### 3. Use Case Pattern ⚙️

Encapsulation de la logique métier.

```typescript
interface CreateStoryUseCase {
    execute(request: CreateStoryRequest): Promise<Result<StoryDTO>>;
}

class CreateStory implements CreateStoryUseCase {
    constructor(
        private repository: StoryRepository,
        private validator: StoryValidator
    ) {}

    async execute(request: CreateStoryRequest): Promise<Result<StoryDTO>> {
        // 1. Validation
        const validationResult = await this.validator.validate(request);
        if (validationResult.isFailure) {
            return Result.fail(validationResult.error);
        }

        // 2. Création
        const storyResult = StoryFactory.create(request);
        if (storyResult.isFailure) {
            return Result.fail(storyResult.error);
        }

        // 3. Persistance
        const story = storyResult.getValue();
        const saveResult = await this.repository.save(story);
        if (saveResult.isFailure) {
            return Result.fail(saveResult.error);
        }

        // 4. Retour
        return Result.ok(StoryMapper.toDTO(story));
    }
}
```

## Bonnes Pratiques d'Implémentation 📝

### 1. Gestion des Erreurs

```typescript
class Result<T> {
    private constructor(
        private isSuccess: boolean,
        private error?: string,
        private value?: T
    ) {}

    static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }
}
```

### 2. Value Objects

```typescript
class StoryPoints {
    private constructor(private value: number) {
        if (value < 0) {
            throw new Error('Points cannot be negative');
        }
    }

    static create(value: number): Result<StoryPoints> {
        if (value < 0) {
            return Result.fail('Points cannot be negative');
        }
        return Result.ok(new StoryPoints(value));
    }
}
```

### 3. Domain Events

```typescript
class StoryCreatedEvent implements DomainEvent {
    constructor(public readonly story: Story) {}
}

class Story extends AggregateRoot<StoryId> {
    create(): void {
        // Logique de création
        this.addDomainEvent(new StoryCreatedEvent(this));
    }
}
```

## Pour Aller Plus Loin 📚

- [Core Concepts](./01-core-concepts.md) - Concepts fondamentaux
- [Architecture Layers](./02-architecture-layers.md) - Structure des couches
