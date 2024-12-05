# Règles de Dépendance dans la Clean Architecture 🏗️

## Introduction

Dans la Clean Architecture, les règles de dépendance sont aussi fondamentales que les fondations d'une maison. Tout comme une maison est construite de bas en haut, avec chaque étage reposant sur celui du dessous, les dépendances dans notre architecture suivent un flux précis et unidirectionnel. 🏠

## Flux de Contrôle 🔄

### 1. La Règle de Dépendance Fondamentale

Tout comme la gravité qui fait que chaque étage d'une maison doit être supporté par celui du dessous, dans la Clean Architecture, les dépendances ne peuvent pointer que vers l'intérieur, vers les couches plus stables :

```typescript
// ❌ Violation de la règle de dépendance
class UserRepositoryInterface {
    // Dépend de l'implémentation concrète
    private database: SQLDatabase;
}

// ✅ Respect de la règle de dépendance
interface UserRepositoryInterface {
    findById(id: string): Promise<UserInterface>;
    save(user: UserInterface): Promise<void>;
}
```

### 2. Direction du Flux

Le flux de contrôle suit un chemin clair et prévisible :

1. **Présentation → Application → Domaine**
2. **Infrastructure → Application → Domaine**

```typescript
// Couche Domaine - Le cœur de l'application
interface UserInterface {
    id: string;
    email: string;
    validate(): boolean;
}

// Couche Application - Orchestration des cas d'utilisation
interface CreateUserUseCaseInterface {
    execute(userData: CreateUserDTOInterface): Promise<ResultType<UserInterface>>;
}

// Couche Infrastructure - Implémentation technique
class UserRepositoryImplementation implements UserRepositoryInterface {
    async findById(id: string): Promise<UserInterface> {
        // Implémentation concrète
    }
}
```

## Inversion des Dépendances 🔄

### 1. Principe Fondamental

L'inversion des dépendances est comme le système de ventilation d'une maison : bien qu'installé après la structure, il est prévu dès la conception. Les modules de haut niveau ne dépendent pas des modules de bas niveau, les deux dépendent d'abstractions.

```typescript
// ❌ Sans inversion de dépendance
class UserService {
    private repository: SQLUserRepository;
    
    constructor() {
        this.repository = new SQLUserRepository();
    }
}

// ✅ Avec inversion de dépendance
class UserService {
    private repository: UserRepositoryInterface;
    
    constructor(repository: UserRepositoryInterface) {
        this.repository = repository;
    }
}
```

### 2. Implémentation Pratique

```typescript
// Définition de l'interface dans la couche domaine
interface LoggerInterface {
    log(message: string, context?: Record<string, unknown>): void;
}

// Implémentation dans la couche infrastructure
class ConsoleLoggerImplementation implements LoggerInterface {
    log(message: string, context: Record<string, unknown> = {}): void {
        console.log(message, context);
    }
}
```

## Gestion des Interfaces 📋

### 1. Définition des Contrats

Les interfaces agissent comme les plans d'architecte, définissant clairement les contrats entre les différentes parties du système :

```typescript
// Interface du repository dans la couche domaine
interface StoryRepositoryInterface {
    findById(id: string): Promise<StoryInterface>;
    save(story: StoryInterface): Promise<void>;
    delete(id: string): Promise<void>;
}

// Interface du service dans la couche application
interface StoryServiceInterface {
    createStory(data: CreateStoryDTOInterface): Promise<ResultType<StoryInterface>>;
    updateStory(id: string, data: UpdateStoryDTOInterface): Promise<ResultType<StoryInterface>>;
}
```

### 2. Séparation des Préoccupations

Chaque interface doit avoir une responsabilité unique et bien définie :

```typescript
// ❌ Interface trop générique
interface RepositoryInterface<T> {
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
    // ... autres méthodes génériques
}

// ✅ Interface spécifique au domaine
interface StoryRepositoryInterface {
    findById(id: string): Promise<StoryInterface>;
    findByAuthor(authorId: string): Promise<StoryInterface[]>;
    save(story: StoryInterface): Promise<void>;
    delete(id: string): Promise<void>;
}
```

## Implémentation Pratique 🛠️

### 1. Structure des Dépendances

```typescript
// Couche Domaine
interface StoryInterface {
    id: string;
    title: string;
    content: string;
    validate(): boolean;
}

// Couche Application
interface CreateStoryUseCaseInterface {
    execute(data: CreateStoryDTOInterface): Promise<ResultType<StoryInterface>>;
}

// Implémentation dans la couche infrastructure
class StoryRepositoryImplementation implements StoryRepositoryInterface {
    constructor(private readonly database: DatabaseInterface) {}

    async findById(id: string): Promise<StoryInterface> {
        // Implémentation spécifique
    }
}
```

### 2. Gestion des Erreurs

```typescript
// Type générique pour la gestion des résultats
type ResultType<T> = {
    isSuccess: boolean;
    error?: ErrorInterface;
    data?: T;
};

// Interface d'erreur dans la couche domaine
interface ErrorInterface {
    code: string;
    message: string;
    context?: Record<string, unknown>;
}
```

## Conclusion 🎯

Les règles de dépendance dans la Clean Architecture sont comme les lois de la physique dans la construction d'une maison : elles sont incontournables et garantissent la stabilité de l'ensemble. En respectant ces règles, nous créons des applications :

- 🏗️ Robustes et stables
- 🔄 Facilement testables
- 📦 Hautement maintenables
- 🚀 Prêtes pour l'évolution

La clé du succès réside dans la compréhension et l'application rigoureuse de ces principes, tout en gardant à l'esprit que, comme pour une maison, une bonne fondation est essentielle pour construire quelque chose qui dure. 
