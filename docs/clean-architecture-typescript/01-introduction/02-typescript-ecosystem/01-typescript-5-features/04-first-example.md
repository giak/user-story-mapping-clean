# Premier Exemple de Clean Architecture 🏗️

> *"Comme la construction d'une maison commence par des fondations solides, notre application commence par une architecture bien pensée."*

## Introduction 🎯

Dans cet exemple, nous allons construire une petite application qui illustre les principes fondamentaux de Clean Architecture. Comme un architecte qui dessine les plans d'une maison avant sa construction, nous allons définir chaque composant avec précision.

## Structure du Projet 📐

```typescript
src/
├── domain/                 # Les fondations de notre maison
│   ├── entities/          # Les éléments structurels
│   └── value-objects/     # Les matériaux de construction
├── application/           # Les plans de construction
│   ├── use-cases/        # Les instructions de montage
│   └── ports/            # Les points de connexion
└── infrastructure/        # Les systèmes et équipements
    └── repositories/      # Le stockage des matériaux
```

## 1. Création d'une Entité 🏛️

> *"Une entité est comme un mur porteur : elle a une identité propre et supporte la structure."*

```typescript
// domain/entities/user.entity.ts

interface UserPropertiesInterface {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class User {
  private readonly props: UserPropertiesInterface;

  constructor(props: UserPropertiesInterface) {
    this.validateEmail(props.email);
    this.props = Object.freeze({
      ...props,
      createdAt: props.createdAt || new Date()
    });
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
```

## 2. Définition des Ports 🚪

> *"Les ports sont comme les prises électriques d'une maison : ils définissent un standard de connexion."*

```typescript
// application/ports/user.repository.interface.ts

export interface UserRepositoryInterface {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

## 3. Implémentation du Use Case 🔨

> *"Un use case est comme un plan de travail détaillé pour les ouvriers."*

```typescript
// application/use-cases/create-user.use-case.ts

interface CreateUserDTOInterface {
  email: string;
  name: string;
}

interface CreateUserResponseType {
  id: string;
  email: string;
  name: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(
    dto: CreateUserDTOInterface
  ): Promise<CreateUserResponseType> {
    const user = new User({
      id: crypto.randomUUID(),
      email: dto.email,
      name: dto.name,
      createdAt: new Date()
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }
}
```

## 4. Tests Unitaires 🧪

> *"Les tests sont comme l'inspection qualité d'une maison : ils garantissent la solidité de la construction."*

```typescript
// tests/unit/create-user.use-case.spec.ts

import { describe, it, expect, vi } from 'vitest';

describe('CreateUserUseCase', () => {
  const mockUserRepository: UserRepositoryInterface = {
    findById: vi.fn(),
    save: vi.fn()
  };

  const useCase = new CreateUserUseCase(mockUserRepository);

  it('should create a user with valid data', async () => {
    const userData = {
      email: 'john@example.com',
      name: 'John Doe'
    };

    const result = await useCase.execute(userData);

    expect(result).toEqual({
      id: expect.any(String),
      email: userData.email,
      name: userData.name
    });

    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw error for invalid email', async () => {
    const userData = {
      email: 'invalid-email',
      name: 'John Doe'
    };

    await expect(useCase.execute(userData))
      .rejects
      .toThrow('Invalid email format');
  });
});
```

## Points Clés à Retenir 🎯

1. **Isolation des Responsabilités** 🏗️
   - Chaque composant a un rôle unique et bien défini
   - Les dépendances sont clairement identifiées
   - L'architecture facilite les tests

2. **Immutabilité** 🛡️
   - Les propriétés sont en lecture seule
   - Les objets sont gelés après création
   - La validation est effectuée à la construction

3. **Tests Robustes** 🧪
   - Tests unitaires isolés
   - Mocks pour les dépendances
   - Scénarios positifs et négatifs

## Pour Aller Plus Loin 📚

- Implémenter la persistance avec un `UserRepository` concret
- Ajouter la validation des données avec un `ValueObject`
- Mettre en place un système d'événements domaine
- Ajouter des cas d'erreur métier

## Conclusion 🏠

Comme une maison bien construite, notre exemple démontre une architecture solide avec :
- Des fondations stables (entités)
- Des plans précis (use cases)
- Des connexions standardisées (ports)
- Une qualité vérifiée (tests)
