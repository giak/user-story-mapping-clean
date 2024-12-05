# Séparation des Préoccupations (SoC) 🏗️

## Introduction

La séparation des préoccupations est un principe fondamental en Clean Architecture, comparable à la division des corps de métier dans la construction d'une maison. Tout comme un électricien ne s'occupe pas de la plomberie, chaque partie de notre code doit avoir une responsabilité unique et bien définie. 🏠

## Isolation des Responsabilités 🎯

### 1. Principe Fondamental

Comme chaque pièce d'une maison a sa fonction spécifique, chaque module de notre application doit avoir une responsabilité unique et clairement définie :

```typescript
// ❌ Violation de la séparation des préoccupations
class UserController {
    private database: DatabaseInterface;
    
    async createUser(data: unknown): Promise<void> {
        // Validation
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data");
        }
        
        // Logique métier
        const user = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date()
        };
        
        // Accès direct à la base de données
        await this.database.insert("users", user);
    }
}

// ✅ Respect de la séparation des préoccupations
interface CreateUserDTOInterface {
    email: string;
    password: string;
}

class CreateUserUseCase implements CreateUserUseCaseInterface {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly validator: ValidatorInterface
    ) {}
    
    async execute(dto: CreateUserDTOInterface): Promise<ResultType<UserInterface>> {
        // Validation via service dédié
        const validationResult = await this.validator.validate(dto);
        if (!validationResult.isValid) {
            return Result.fail(validationResult.errors);
        }
        
        // Création via repository
        const user = await this.userRepository.create(dto);
        return Result.ok(user);
    }
}
```

### 2. Avantages de l'Isolation

- 🎯 Responsabilité unique
- 🔍 Code plus facile à tester
- 🔄 Maintenance simplifiée
- 🚀 Évolutivité améliorée

## Découpage en Couches 📚

### 1. Structure des Couches

Comme les différents étages d'une maison, chaque couche a son rôle spécifique :

```typescript
// Couche Domaine - Les fondations
interface StoryInterface {
    id: string;
    title: string;
    content: string;
    validate(): boolean;
}

// Couche Application - L'étage principal
interface StoryServiceInterface {
    createStory(data: CreateStoryDTOInterface): Promise<ResultType<StoryInterface>>;
    updateStory(id: string, data: UpdateStoryDTOInterface): Promise<ResultType<StoryInterface>>;
}

// Couche Infrastructure - Les installations techniques
class StoryRepositoryImplementation implements StoryRepositoryInterface {
    constructor(private readonly database: DatabaseInterface) {}
    
    async findById(id: string): Promise<StoryInterface> {
        // Implémentation spécifique à l'infrastructure
    }
}

// Couche Présentation - La façade
class StoryController {
    constructor(private readonly storyService: StoryServiceInterface) {}
    
    async createStory(req: RequestInterface): Promise<ResponseInterface> {
        const result = await this.storyService.createStory(req.body);
        return this.createResponse(result);
    }
}
```

## Frontières Architecturales 🔒

### 1. Définition des Limites

Comme les murs porteurs d'une maison, les frontières architecturales définissent clairement les limites entre les différentes parties du système :

```typescript
// Définition de la frontière du domaine
interface StoryRepositoryInterface {
    findById(id: string): Promise<StoryInterface>;
    save(story: StoryInterface): Promise<void>;
}

// Définition de la frontière applicative
interface CreateStoryUseCaseInterface {
    execute(data: CreateStoryDTOInterface): Promise<ResultType<StoryInterface>>;
}

// Définition de la frontière d'infrastructure
interface DatabaseInterface {
    query<T>(sql: string, params: unknown[]): Promise<T>;
    execute(sql: string, params: unknown[]): Promise<void>;
}
```

### 2. Communication Entre Couches

```typescript
// Type pour la communication entre couches
type ResultType<T> = {
    isSuccess: boolean;
    error?: ErrorInterface;
    data?: T;
};

// Interface pour les événements entre couches
interface DomainEventInterface {
    occurredOn: Date;
    eventName: string;
    payload: unknown;
}
```

## Patterns d'Isolation 🎨

### 1. Adapter Pattern

Comme un adaptateur électrique qui permet de connecter différents types de prises, le pattern Adapter permet d'isoler les différentes parties du système :

```typescript
// Interface externe
interface ExternalPaymentAPIInterface {
    processPayment(amount: number, currency: string): Promise<boolean>;
}

// Adapter pour notre domaine
interface PaymentServiceInterface {
    pay(amount: MoneyValueObject): Promise<ResultType<PaymentInterface>>;
}

// Implémentation de l'adapter
class PaymentServiceAdapter implements PaymentServiceInterface {
    constructor(private readonly externalAPI: ExternalPaymentAPIInterface) {}
    
    async pay(amount: MoneyValueObject): Promise<ResultType<PaymentInterface>> {
        try {
            const result = await this.externalAPI.processPayment(
                amount.value,
                amount.currency
            );
            
            return result 
                ? Result.ok({ id: crypto.randomUUID(), status: "success" })
                : Result.fail("Payment failed");
        } catch (error) {
            return Result.fail("Payment system error");
        }
    }
}
```

### 2. Façade Pattern

```typescript
// Façade pour simplifier l'interaction avec le système
class StoryFacade {
    constructor(
        private readonly createStoryUseCase: CreateStoryUseCaseInterface,
        private readonly updateStoryUseCase: UpdateStoryUseCaseInterface,
        private readonly deleteStoryUseCase: DeleteStoryUseCaseInterface
    ) {}
    
    async createStory(data: CreateStoryDTOInterface): Promise<ResultType<StoryInterface>> {
        return this.createStoryUseCase.execute(data);
    }
    
    async updateStory(id: string, data: UpdateStoryDTOInterface): Promise<ResultType<StoryInterface>> {
        return this.updateStoryUseCase.execute(id, data);
    }
}
```

## Conclusion 🎯

La séparation des préoccupations est comme le plan d'architecte d'une maison : elle garantit que chaque élément est à sa place et remplit sa fonction spécifique. En appliquant ce principe, nous créons des applications qui sont :

- 🏗️ Bien structurées et organisées
- 🔄 Faciles à maintenir et à faire évoluer
- 🧪 Testables de manière isolée
- 📦 Modulaires et réutilisables

Tout comme une maison bien conçue résiste au temps et s'adapte aux besoins de ses habitants, une application respectant la séparation des préoccupations reste robuste et flexible face aux évolutions des besoins métier. 
