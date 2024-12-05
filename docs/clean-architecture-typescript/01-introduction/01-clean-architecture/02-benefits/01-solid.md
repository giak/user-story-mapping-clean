# Principes SOLID 🏗️

> *"Un code bien structuré est comme une maison bien construite : chaque élément a sa place et son rôle, et l'ensemble est stable et durable."*

## Introduction

Les principes SOLID sont les fondations d'une architecture logicielle robuste. Comme les règles fondamentales de l'architecture d'une maison, ils guident la conception de nos applications vers plus de stabilité, de maintenabilité et d'évolutivité.

📚 Pour approfondir ce sujet, nous vous recommandons l'excellent article de Robert C. Martin (Uncle Bob) : ["The Principles of OOD"](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod).

## Les Cinq Principes 🏛️

### 1. Single Responsibility Principle (SRP) 🎯

*"Une classe ne devrait avoir qu'une seule raison de changer"*

Comme chaque pièce d'une maison a une fonction spécifique :
- La cuisine est dédiée à la préparation des repas
- La salle de bain est consacrée à l'hygiène
- Le salon est réservé à la détente

```typescript
// ❌ Violation du SRP
interface UserInterface {
  saveToDatabase(): void;
  sendEmail(): void;
  generateReport(): void;
}

// ✅ Respect du SRP
interface UserRepositoryInterface {
  save(user: UserInterface): Promise<void>;
}

interface UserNotifierInterface {
  notify(user: UserInterface): Promise<void>;
}

interface UserReportGeneratorInterface {
  generate(user: UserInterface): Promise<ReportType>;
}
```

### 2. Open/Closed Principle (OCP) 🚪

*"Les entités logicielles doivent être ouvertes à l'extension mais fermées à la modification"*

Comme une maison modulaire où l'on peut ajouter des extensions sans toucher à la structure existante :
- Ajout d'une véranda sans modifier les murs porteurs
- Extension du garage sans impacter la maison principale
- Aménagement des combles sans changer l'étage inférieur

```typescript
interface PaymentMethodInterface {
  process(amount: number): Promise<PaymentResultType>;
}

// Extensions sans modifier l'interface existante
class CreditCardPayment implements PaymentMethodInterface {
  async process(amount: number): Promise<PaymentResultType> {
    // Implémentation spécifique
  }
}

class CryptoPayment implements PaymentMethodInterface {
  async process(amount: number): Promise<PaymentResultType> {
    // Nouvelle méthode de paiement
  }
}
```

### 3. Liskov Substitution Principle (LSP) 🔄

*"Les objets d'une classe dérivée doivent pouvoir remplacer les objets de la classe de base"*

Comme les fenêtres d'une maison qui peuvent être remplacées par différents modèles :
- Une fenêtre double vitrage peut remplacer une fenêtre simple vitrage
- Une fenêtre oscillo-battante peut remplacer une fenêtre classique
- Chaque type de fenêtre respecte les mêmes dimensions et fonctionnalités de base

```typescript
interface ShapeInterface {
  calculateArea(): number;
}

class Rectangle implements ShapeInterface {
  constructor(
    protected readonly width: number,
    protected readonly height: number
  ) {}

  calculateArea(): number {
    return this.width * this.height;
  }
}

class Square implements ShapeInterface {
  constructor(
    private readonly side: number
  ) {}

  calculateArea(): number {
    return this.side * this.side;
  }
}
```

### 4. Interface Segregation Principle (ISP) 📋

*"Les clients ne devraient pas être forcés de dépendre d'interfaces qu'ils n'utilisent pas"*

Comme les prises électriques d'une maison, chaque appareil utilise uniquement les connecteurs dont il a besoin :
- Une lampe n'utilise que la prise électrique standard
- Un ordinateur peut nécessiter une prise réseau supplémentaire
- Un téléphone peut utiliser uniquement un port USB

```typescript
// ❌ Interface trop large
interface WorkerInterface {
  work(): void;
  eat(): void;
  sleep(): void;
}

// ✅ Interfaces ségrégées
interface WorkableInterface {
  work(): void;
}

interface EaterInterface {
  eat(): void;
}

interface SleepableInterface {
  sleep(): void;
}
```

### 5. Dependency Inversion Principle (DIP) 🔌

*"Les modules de haut niveau ne devraient pas dépendre des modules de bas niveau"*

Comme le système électrique d'une maison :
- Les appareils (haut niveau) se branchent sur des prises standardisées
- Le câblage électrique (bas niveau) est caché dans les murs
- Les deux dépendent d'un standard commun (la norme électrique)

```typescript
// ✅ Dépendance vers les abstractions
interface LoggerInterface {
  log(message: string): void;
}

class ConsoleLogger implements LoggerInterface {
  log(message: string): void {
    console.log(message);
  }
}

class FileLogger implements LoggerInterface {
  log(message: string): void {
    // Écriture dans un fichier
  }
}

// Le service dépend de l'abstraction
class UserService {
  constructor(private readonly logger: LoggerInterface) {}

  createUser(user: UserInterface): void {
    // Logique de création
    this.logger.log('User created');
  }
}
```

## Conclusion 🎯

Les principes SOLID sont comme les règles fondamentales de l'architecture d'une maison :
- **SRP** : Chaque pièce a sa fonction
- **OCP** : La maison peut être agrandie sans tout reconstruire
- **LSP** : Les composants sont interchangeables
- **ISP** : Chaque équipement utilise ce dont il a besoin
- **DIP** : Tout repose sur des standards communs

En respectant ces principes, nous construisons des applications aussi solides et durables qu'une maison bien conçue. 🏠
