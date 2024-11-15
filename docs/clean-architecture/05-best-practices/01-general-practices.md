# Bonnes Pratiques Générales 🎯

## Vue d'ensemble

Les bonnes pratiques générales s'appliquent à toutes les couches de l'application et garantissent la qualité, la maintenabilité et la robustesse du code.

## Principes Fondamentaux

### 1. SOLID 🏛️

```typescript
// Single Responsibility Principle (Principe de Responsabilité Unique)
// ✅ Bon : Une seule responsabilité
export class StoryValidator {
  validate(story: Story): Result<void> {
    // Uniquement la validation
  }
}

// Open/Closed Principle (Principe Ouvert/Fermé)
// ✅ Bon : Extension sans modification
export interface ValidationRule {
  validate(value: unknown): boolean;
}

export class RequiredRule implements ValidationRule {
  validate(value: unknown): boolean {
    return value !== null && value !== undefined;
  }
}

export class MinLengthRule implements ValidationRule {
  constructor(private readonly minLength: number) {}
  
  validate(value: string): boolean {
    return value.length >= this.minLength;
  }
}

// Liskov Substitution Principle (Principe de Substitution de Liskov)
// ✅ Bon : Sous-types substituables
export abstract class Entity<T> {
  abstract validate(): Result<void>;
}

export class Story extends Entity<StoryId> {
  validate(): Result<void> {
    // Validation spécifique qui respecte le contrat
  }
}

// Interface Segregation Principle (Principe de Ségrégation des Interfaces)
// ✅ Bon : Interfaces spécifiques
export interface Readable<T> {
  read(id: string): Promise<T>;
}

export interface Writable<T> {
  write(data: T): Promise<void>;
}

// Dependency Inversion Principle (Principe d'Inversion des Dépendances)
// ✅ Bon : Dépendance sur les abstractions
export class StoryService {
  constructor(
    private readonly repository: StoryRepositoryInterface
  ) {}
}
```

### 2. Clean Code 📝

```typescript
// ✅ Bon : Noms descriptifs
export function calculerTotalPointsStory(stories: Story[]): number {
  return stories.reduce((total, story) => total + story.points, 0);
}

// ✅ Bon : Fonctions courtes et focalisées
export function validerTitreStory(titre: string): Result<void> {
  if (!titre) {
    return Result.fail(new ValidationError("Le titre est requis"));
  }
  
  if (titre.length < 3) {
    return Result.fail(new ValidationError("Le titre est trop court"));
  }
  
  if (titre.length > 100) {
    return Result.fail(new ValidationError("Le titre est trop long"));
  }
  
  return Result.ok();
}

// ✅ Bon : Arguments explicites
export interface OptionsCreationStory {
  titre: string;
  description: string;
  points: number;
  idAssigne?: string;
  priorite?: Priority;
}

export function creerStory(options: OptionsCreationStory): Result<Story> {
  // Création avec options nommées
}
```

### 3. Gestion des Erreurs ⚠️

```typescript
// ✅ Bon : Hiérarchie d'erreurs
export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(`Erreur de validation : ${message}`);
  }
}

// ✅ Bon : Pattern Result
export class Result<T> {
  private constructor(
    private readonly isSuccess: boolean,
    private readonly error?: Error,
    private readonly value?: T
  ) {}

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: Error): Result<U> {
    return new Result<U>(false, error);
  }
}

// ✅ Bon : Gestion explicite des erreurs
export async function gererCreationStory(
  dto: CreateStoryDTO
): Promise<Result<StoryDTO>> {
  try {
    const validationResult = await validerStory(dto);
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }

    const story = await creerStory(dto);
    return Result.ok(story);
  } catch (error) {
    return Result.fail(new ApplicationError("Échec de création de la story", error));
  }
}
```

### 4. Tests 🧪

```typescript
// ✅ Bon : Tests unitaires clairs
describe("Story", () => {
  describe("create", () => {
    it("devrait créer une story valide", () => {
      // Arrange
      const props = {
        titre: "Titre valide",
        description: "Description valide",
        points: 5
      };

      // Act
      const result = Story.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeInstanceOf(Story);
    });

    it("devrait échouer avec un titre invalide", () => {
      // Arrange
      const props = {
        titre: "", // Invalide
        description: "Description valide",
        points: 5
      };

      // Act
      const result = Story.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBeInstanceOf(ValidationError);
    });
  });
});

// ✅ Bon : Tests d'intégration
describe("StoryRepository", () => {
  let repository: StoryRepository;
  let database: Database;

  beforeEach(async () => {
    database = await createTestDatabase();
    repository = new StoryRepository(database);
  });

  afterEach(async () => {
    await database.cleanup();
  });

  it("devrait sauvegarder et récupérer une story", async () => {
    // Arrange
    const story = createTestStory();

    // Act
    await repository.save(story);
    const retrieved = await repository.findById(story.id);

    // Assert
    expect(retrieved.isSuccess).toBe(true);
    expect(retrieved.value).toEqual(story);
  });
});
```

### 5. Documentation 📚

```typescript
/**
 * Représente une Story dans le système.
 * Une Story est une unité de travail qui peut être estimée et assignée.
 */
export class Story extends AggregateRoot<StoryId> {
  /**
   * Crée une nouvelle Story.
   * @param props - Les propriétés de la Story
   * @throws {ValidationError} Si les propriétés sont invalides
   * @returns Result contenant la Story ou une erreur
   */
  public static create(props: StoryProps): Result<Story> {
    // Implémentation
  }

  /**
   * Vérifie si la Story peut être déplacée dans un Sprint.
   * Une Story peut être déplacée si :
   * - Elle est estimée
   * - Elle a des critères d'acceptation
   * - Elle n'est pas bloquée
   */
  public canBeMovedToSprint(): boolean {
    // Implémentation
  }
}
```

## Anti-Patterns à Éviter ⚠️

### 1. Code Dupliqué

```typescript
// ❌ Mauvais : Logique dupliquée
export class StoryService {
  validerTitre(titre: string): boolean {
    return titre.length >= 3 && titre.length <= 100;
  }
}

export class EpicService {
  validerTitre(titre: string): boolean {
    return titre.length >= 3 && titre.length <= 100;
  }
}

// ✅ Bon : Logique partagée
export const ValidationTitre = {
  LONGUEUR_MIN: 3,
  LONGUEUR_MAX: 100,
  
  valider(titre: string): boolean {
    return titre.length >= this.LONGUEUR_MIN && 
           titre.length <= this.LONGUEUR_MAX;
  }
};
```

### 2. Couplage Fort

```typescript
// ❌ Mauvais : Couplage fort
export class StoryService {
  private repository = new StoryRepository(); // Couplage fort
  private validator = new StoryValidator();   // Couplage fort
}

// ✅ Bon : Injection de dépendances
export class StoryService {
  constructor(
    private readonly repository: StoryRepositoryInterface,
    private readonly validator: StoryValidatorInterface
  ) {}
}
```

### 3. Commentaires Inutiles

```typescript
// ❌ Mauvais : Commentaires évidents
function additionnerPointsStory(a: number, b: number): number {
  // Additionne a et b
  return a + b; // Retourne la somme
}

// ✅ Bon : Code auto-documenté
function calculerTotalPointsStory(stories: Story[]): number {
  return stories.reduce(
    (total, story) => total + story.points,
    0
  );
}
```

## Bonnes Pratiques par Type 📋

### 1. Nommage

```typescript
// ✅ Bon : Noms descriptifs et cohérents
export interface CommandeCreationStory {
  readonly titre: string;
  readonly description: string;
  readonly points: number;
}

export interface EvenementStoryCreee {
  readonly storyId: string;
  readonly timestamp: Date;
}

export class ErreurTitreStoryTropCourt extends ValidationError {
  constructor(titre: string) {
    super(`Le titre de la story "${titre}" est trop court`);
  }
}
```

### 2. Structure des Fichiers

```typescript
// ✅ Bon : Un concept par fichier
// story.entity.ts
export class Story extends AggregateRoot<StoryId> {}

// story.repository.ts
export interface StoryRepository {}

// story.service.ts
export class StoryService {}

// story.validator.ts
export class StoryValidator {}
```

### 3. Imports

```typescript
// ✅ Bon : Imports organisés
// 1. Imports externes
import { inject, injectable } from "inversify";
import { validate } from "class-validator";

// 2. Imports du domaine
import { Story } from "./story.entity";
import { StoryRepository } from "./story.repository";

// 3. Imports partagés
import { Result } from "@shared/common/result";
import { Validator } from "@shared/validation/validator";
```

### 4. Types

```typescript
// ✅ Bon : Types stricts
export type StoryId = string & { readonly brand: unique symbol };

export interface StoryProps {
  readonly titre: string;
  readonly description: string;
  readonly points: number;
}

export type PropsUpdateStory = Partial<StoryProps>;
```

## Directives Générales 📋

1. Appliquer systématiquement les principes SOLID
2. Maintenir un code propre et lisible
3. Gérer les erreurs de manière cohérente
4. Écrire des tests complets et maintenables
5. Documenter le code de manière pertinente
6. Éviter la duplication de code
7. Favoriser l'injection de dépendances
8. Utiliser des types stricts
9. Organiser le code de manière cohérente
10. Maintenir une nomenclature claire et consistante
