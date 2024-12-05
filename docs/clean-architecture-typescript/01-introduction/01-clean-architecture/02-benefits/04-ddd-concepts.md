# Concepts Domain-Driven Design (DDD) 🏗️

## Introduction

Le Domain-Driven Design est comme l'art de concevoir une maison en partant des besoins réels de ses habitants. Au lieu de commencer par les aspects techniques, nous nous concentrons d'abord sur la façon dont la maison sera utilisée et vécue. Dans notre contexte de développement, cela signifie partir du domaine métier pour guider notre conception. 🏠

## Bounded Contexts 🔲

### 1. Définition et Principes

Comme une maison est divisée en espaces distincts (cuisine, salon, chambres), une application est divisée en contextes métier bien délimités. Chaque contexte a son propre vocabulaire et ses propres règles :

```typescript
// Contexte de Gestion des Stories
namespace StoryContext {
    interface StoryInterface {
        id: string;
        title: string;
        content: string;
        status: StoryStatusType;
    }
    
    type StoryStatusType = "draft" | "published" | "archived";
}

// Contexte de Gestion des Utilisateurs
namespace UserContext {
    interface UserInterface {
        id: string;
        email: string;
        role: UserRoleType;
    }
    
    type UserRoleType = "author" | "editor" | "admin";
}
```

### 2. Communication Entre Contextes

```typescript
// Définition du contrat entre contextes
interface ContextMapInterface {
    translateStoryToPublication(story: StoryContext.StoryInterface): PublicationContext.PublicationInterface;
    translateUserToAuthor(user: UserContext.UserInterface): PublicationContext.AuthorInterface;
}

// Anti-Corruption Layer
class PublicationTranslator implements ContextMapInterface {
    translateStoryToPublication(story: StoryContext.StoryInterface): PublicationContext.PublicationInterface {
        return {
            id: story.id,
            title: story.title,
            content: story.content,
            publishedAt: new Date()
        };
    }
}
```

## Agrégats et Entités 📦

### 1. Agrégats

Comme une maison a des pièces principales qui organisent l'espace, les agrégats sont les gardiens de la cohérence de notre domaine :

```typescript
// Définition d'un agrégat racine
interface StoryAggregateInterface {
    readonly id: string;
    readonly title: string;
    readonly sections: SectionInterface[];
    readonly comments: CommentInterface[];
    
    addSection(section: SectionInterface): ResultType<void>;
    removeSection(sectionId: string): ResultType<void>;
    addComment(comment: CommentInterface): ResultType<void>;
    publish(): ResultType<void>;
}

// Implémentation de l'agrégat
class StoryAggregate implements StoryAggregateInterface {
    private constructor(
        public readonly id: string,
        public readonly title: string,
        private readonly _sections: SectionInterface[],
        private readonly _comments: CommentInterface[]
    ) {}
    
    static create(title: string): ResultType<StoryAggregateInterface> {
        if (!title.trim()) {
            return Result.fail("Title cannot be empty");
        }
        
        return Result.ok(new StoryAggregate(
            crypto.randomUUID(),
            title,
            [],
            []
        ));
    }
    
    addSection(section: SectionInterface): ResultType<void> {
        if (this._sections.length >= 10) {
            return Result.fail("Maximum sections reached");
        }
        
        this._sections.push(section);
        return Result.ok();
    }
}
```

### 2. Entités

Les entités sont comme les meubles essentiels d'une maison, chacun avec son identité propre :

```typescript
interface SectionInterface {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly order: number;
    
    updateContent(content: string): ResultType<void>;
    moveToPosition(newOrder: number): ResultType<void>;
}

class Section implements SectionInterface {
    private constructor(
        public readonly id: string,
        public readonly title: string,
        private _content: string,
        private _order: number
    ) {}
    
    static create(title: string, content: string, order: number): ResultType<SectionInterface> {
        if (!title.trim() || !content.trim()) {
            return Result.fail("Title and content are required");
        }
        
        return Result.ok(new Section(
            crypto.randomUUID(),
            title,
            content,
            order
        ));
    }
}
```

## Value Objects 💎

Les Value Objects sont comme les matériaux de construction : ils n'ont pas d'identité propre mais sont définis par leurs propriétés :

```typescript
interface EmailValueObject {
    readonly value: string;
    equals(other: EmailValueObject): boolean;
}

class Email implements EmailValueObject {
    private constructor(public readonly value: string) {}
    
    static create(email: string): ResultType<EmailValueObject> {
        if (!email.includes("@")) {
            return Result.fail("Invalid email format");
        }
        
        return Result.ok(new Email(email));
    }
    
    equals(other: EmailValueObject): boolean {
        return this.value === other.value;
    }
}

interface MoneyValueObject {
    readonly amount: number;
    readonly currency: string;
    add(other: MoneyValueObject): ResultType<MoneyValueObject>;
    subtract(other: MoneyValueObject): ResultType<MoneyValueObject>;
}
```

## Services Domaine 🛠️

Les services domaine sont comme les systèmes essentiels d'une maison (électricité, plomberie) qui coordonnent plusieurs éléments :

```typescript
interface StoryPublicationServiceInterface {
    publishStory(story: StoryAggregateInterface): Promise<ResultType<void>>;
    schedulePublication(story: StoryAggregateInterface, date: Date): Promise<ResultType<void>>;
}

class StoryPublicationService implements StoryPublicationServiceInterface {
    constructor(
        private readonly storyRepository: StoryRepositoryInterface,
        private readonly notificationService: NotificationServiceInterface
    ) {}
    
    async publishStory(story: StoryAggregateInterface): Promise<ResultType<void>> {
        // Vérification des règles métier
        const validationResult = await this.validateForPublication(story);
        if (validationResult.isFailure) {
            return Result.fail(validationResult.error);
        }
        
        // Publication
        const publishResult = story.publish();
        if (publishResult.isFailure) {
            return Result.fail(publishResult.error);
        }
        
        // Sauvegarde et notification
        await this.storyRepository.save(story);
        await this.notificationService.notifySubscribers(story.id);
        
        return Result.ok();
    }
}
```

## Conclusion 🎯

Le Domain-Driven Design est comme un guide d'architecture qui nous aide à construire des applications robustes et cohérentes :

- 🏗️ Les Bounded Contexts définissent des espaces métier clairs
- 📦 Les Agrégats maintiennent la cohérence des données
- 💎 Les Value Objects encapsulent les concepts métier
- 🛠️ Les Services Domaine orchestrent les opérations complexes

Tout comme une maison bien conçue reflète les besoins de ses habitants, une application construite selon les principes DDD reflète fidèlement les besoins et la logique du domaine métier. 
