# Clean Architecture Vue.js - Documentation

## Table des matières

### 1. Introduction
- [Vue d'ensemble](./01-introduction/01-overview.md)
  - Diagramme global de l'architecture Clean Architecture
  - Structure en couches (Présentation, Application, Domaine, Infrastructure)
  - Flux de données et interactions entre les couches
  - Organisation générale du projet

- [Principes Fondamentaux](./01-introduction/02-fundamental-principles.md)
  - Indépendance des frameworks et de l'UI
  - Testabilité et maintenabilité
  - Règles de dépendance et d'inversion de contrôle
  - Séparation des préoccupations

- [Objectifs et Bénéfices](./01-introduction/03-objectives-benefits.md)
  - Maintenabilité et évolutivité du code
  - Testabilité et qualité
  - Flexibilité et adaptabilité
  - Réutilisabilité des composants

### 2. Structure des Couches
- [Couche Présentation](./02-layers/01-presentation-layer.md)
  - Composants Vue.js et interfaces utilisateur
  - Gestion de l'état avec Pinia
  - Composables et logique de présentation
  - Patterns d'interaction utilisateur

- [Couche Application](./02-layers/02-application-layer.md)
  - Use Cases et orchestration
  - DTOs et transformation de données
  - Services d'application
  - Gestion des événements

- [Couche Domaine](./02-layers/03-domain-layer.md)
  - Entités et agrégats
  - Value Objects
  - Services domaine
  - Règles métier et invariants

- [Couche Infrastructure](./02-layers/04-infrastructure-layer.md)
  - Implémentation des repositories
  - Intégrations externes
  - Services techniques
  - Gestion de la persistance

### 3. Structure des Dossiers
- [Organisation Globale](./03-structure/01-global-organization.md)
  - Structure racine du projet
  - Organisation des modules
  - Configuration globale
  - Gestion des assets

- [Structure d'un Contexte](./03-structure/02-context-structure.md)
  - Organisation d'un contexte métier
  - Séparation des couches
  - Tests et documentation
  - Patterns d'implémentation

- [Code Partagé](./03-structure/03-shared-code.md)
  - Types et interfaces communs
  - Utilitaires et helpers
  - Composants réutilisables
  - Constants et configurations

- [Infrastructure](./03-structure/04-infrastructure.md)
  - Services techniques globaux
  - Configuration des services externes
  - Gestion des erreurs
  - Logging et monitoring

### 4. Patterns d'Implémentation
- [Patterns du Domaine](./04-implementation/01-domain-patterns.md)
  - Entity Pattern
  - Value Object Pattern
  - Aggregate Pattern
  - Repository Pattern

- [Patterns de l'Application](./04-implementation/02-application-patterns.md)
  - Use Case Pattern
  - DTO Pattern
  - Service Pattern
  - Event Pattern

- [Patterns de l'Infrastructure](./04-implementation/03-infrastructure-patterns.md)
  - Repository Implementation Pattern
  - Gateway Pattern
  - Adapter Pattern
  - Unit of Work Pattern

- [Patterns de la Présentation](./04-implementation/04-presentation-patterns.md)
  - Composable Pattern
  - Store Pattern
  - Container/Presentational Pattern
  - Form Pattern

### 5. Bonnes Pratiques
- [Pratiques Générales](./05-best-practices/01-general-practices.md)
  - Principes SOLID
  - Clean Code
  - Gestion des erreurs
  - Tests et documentation

- [Anti-Patterns](./05-best-practices/02-antipatterns.md)
  - God Objects
  - Anemic Domain Model
  - Couplage fort
  - Violation d'encapsulation

- [Pratiques par Couche](./05-best-practices/03-layer-specific-practices.md)
  - Pratiques de la couche domaine
  - Pratiques de la couche application
  - Pratiques de la couche infrastructure
  - Pratiques de la couche présentation

### 6. Getting Started
- [Configuration Initiale](./06-getting-started/01-initial-setup.md)
  - Installation des dépendances
  - Configuration de base
  - Structure initiale
  - Scripts npm

- [Structure des Dossiers](./06-getting-started/02-folder-structure.md)
  - Organisation des dossiers
  - Conventions de nommage
  - Configuration des paths
  - Organisation des tests

- [Configuration TypeScript](./06-getting-started/03-typescript-config.md)
  - Configuration du compilateur
  - Types globaux
  - Alias de chemins
  - ESLint et Prettier

- [Configuration de Base](./06-getting-started/04-base-configuration.md)
  - Configuration Vue.js
  - Configuration Pinia
  - Configuration du Router
  - Configuration des tests

Chaque section contient des exemples de code concrets et des explications détaillées pour faciliter la compréhension et l'implémentation.
