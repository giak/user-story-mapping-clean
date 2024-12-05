# Structure de Clean Architecture 🏗️

## Introduction

Imaginez la construction d'une maison moderne. Avant même de poser la première brique, l'architecte dessine des plans détaillés qui définissent chaque espace et leur interaction. La Clean Architecture suit le même principe : elle définit une structure claire où chaque élément a sa place et son rôle.

## Les Couches Fondamentales 🏛️

### 1. Domain Layer (Les Fondations) 🏠

Comme les fondations d'une maison qui supportent toute la structure, la couche Domain est la plus importante et la plus stable. Elle définit les règles métier essentielles et ne dépend d'aucune autre couche.

**Contenu :**
- `entities/` : Les objets métier fondamentaux
- `value-objects/` : Les concepts métier immuables
- `repositories/` : Les interfaces de persistance
- `services/` : Les services métier purs
- `events/` : Les événements du domaine
- `errors/` : Les erreurs spécifiques au domaine

### 2. Application Layer (Les Murs) 🧱

Tels les murs qui structurent l'espace habitable, la couche Application orchestre les cas d'utilisation en s'appuyant sur le domaine.

**Contenu :**
- `use-cases/` : Les cas d'utilisation métier
- `services/` : Les services d'orchestration
- `dtos/` : Les objets de transfert de données
- `ports/` : Les interfaces pour les services externes
- `queries/` : Les requêtes de lecture (CQRS)
- `commands/` : Les commandes de modification (CQRS)

### 3. Infrastructure Layer (Les Systèmes) 🔌

Comparable aux systèmes d'une maison (électricité, plomberie), cette couche gère les aspects techniques et les interactions avec le monde extérieur.

**Contenu :**
- `repositories/` : Implémentation de la persistance
- `adapters/` : Adaptateurs pour services externes
- `database/` : Configuration des bases de données
- `api/` : Configuration des APIs
- `security/` : Services de sécurité
- `logging/` : Services de journalisation

### 4. Presentation Layer (La Façade) 🎨

La façade de notre maison, c'est ce que voit l'utilisateur. Cette couche gère l'interface utilisateur et l'expérience utilisateur.

**Contenu :**
- `views/` : Les pages de l'application
- `components/` : Les composants réutilisables
- `stores/` : La gestion d'état locale
- `layouts/` : Les mises en page
- `composables/` : La logique réutilisable
- `assets/` : Les ressources statiques

## Structure Complète des Dossiers 📂

```bash
src/
├── domain/                 # Les fondations (règles métier)
│   ├── entities/          # Entités métier fondamentales
│   ├── value-objects/     # Objets de valeur immuables
│   ├── repositories/      # Interfaces de persistance
│   ├── services/         # Services métier purs
│   ├── events/           # Événements du domaine
│   └── errors/           # Erreurs spécifiques
│
├── application/          # Les murs (orchestration)
│   ├── use-cases/       # Cas d'utilisation
│   ├── services/        # Services d'orchestration
│   ├── dtos/            # Objets de transfert
│   ├── ports/           # Interfaces externes
│   ├── queries/         # Requêtes (CQRS)
│   └── commands/        # Commandes (CQRS)
│
├── infrastructure/       # Les systèmes (technique)
│   ├── repositories/    # Implémentation persistance
│   ├── adapters/        # Adaptateurs externes
│   ├── database/        # Config base de données
│   ├── api/             # Configuration API
│   ├── security/        # Services sécurité
│   └── logging/         # Services logs
│
└── presentation/        # La façade (interface)
    ├── views/           # Pages application
    ├── components/      # Composants UI
    ├── stores/          # Gestion d'état
    ├── layouts/         # Mises en page
    ├── composables/     # Logique réutilisable
    └── assets/          # Ressources statiques
```

## Flux de Dépendances 🔄

Comme l'eau qui coule toujours du haut vers le bas dans une maison, les dépendances dans Clean Architecture suivent une règle stricte : elles pointent toujours vers l'intérieur.

- La couche Presentation dépend de Application
- La couche Application dépend de Domain
- La couche Infrastructure implémente les interfaces de Domain
- La couche Domain ne dépend de rien

## Communication Entre Couches 📡

Comme les différentes pièces d'une maison sont reliées par des portes et des couloirs, les couches communiquent via des interfaces bien définies :

1. **Communication Descendante** 📥
   - Les couches externes appellent directement les couches internes
   - Utilisation d'interfaces définies par les couches internes

2. **Communication Ascendante** 📤
   - Utilisation du pattern Observer
   - Events et messages pour la communication asynchrone

3. **Communication Transverse** ↔️
   - Évitée autant que possible
   - Utilisation de médiateurs si nécessaire

## Organisation par Contextes 🎯

Pour les grandes applications, comme pour les grandes maisons, nous organisons l'espace en zones fonctionnelles :

```bash
src/
├── contexts/              # Domaines métier isolés
│   ├── user/             # Contexte utilisateur
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   └── product/          # Contexte produit
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
│
└── shared/               # Code partagé
    ├── domain/
    ├── application/
    ├── infrastructure/
    └── presentation/
```

## Bonnes Pratiques 🌟

1. **Isolation des Couches**
   - Chaque couche doit être indépendante
   - Comme chaque étage d'une maison est autonome

2. **Règle de Dépendance**
   - Les dépendances pointent vers l'intérieur
   - Le domaine reste pur et isolé

3. **Séparation des Préoccupations**
   - Chaque dossier a une responsabilité unique
   - Comme chaque pièce d'une maison a sa fonction

4. **Organisation des Tests**
   - Tests unitaires par couche
   - Tests d'intégration entre couches
   - Tests end-to-end pour les scénarios complets

## Conclusion 🎯

La Clean Architecture, comme une maison bien conçue, repose sur une structure solide et bien organisée. Cette organisation :
- Facilite la navigation dans le code
- Clarifie les responsabilités
- Permet une évolution maîtrisée
- Garantit la maintenabilité

En suivant cette structure, nous construisons une base solide pour notre application, comme un architecte pose les fondations d'une maison durable. 🏠
