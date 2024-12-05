# Structure du Projet 🏗️

## Introduction

Tout comme une maison bien conçue nécessite un plan d'architecte détaillé avec des espaces bien définis, notre projet TypeScript requiert une structure claire et organisée. Cette organisation n'est pas seulement esthétique, elle est fonctionnelle et facilite la maintenance à long terme. 🏠

## Organisation des Dossiers 📂

### 1. Structure Racine

Comme les différents étages d'une maison, chaque niveau de notre structure a son rôle :

```
user-story-mapping/
├── src/                        # Code source principal
├── tests/                      # Tests unitaires et d'intégration
├── docs/                       # Documentation du projet
├── public/                     # Assets statiques
├── scripts/                    # Scripts utilitaires
└── config/                     # Fichiers de configuration
```

### 2. Structure Clean Architecture

Comme les pièces d'une maison ont chacune leur fonction spécifique, notre code est organisé en couches distinctes :

```
src/
├── domain/                     # 🎯 Cœur métier
│   ├── entities/              # Entités métier
│   │   ├── StoryInterface.ts
│   │   └── UserInterface.ts
│   ├── value-objects/         # Objets valeur
│   │   ├── EmailValueObject.ts
│   │   └── StatusType.ts
│   ├── repositories/          # Interfaces des repositories
│   │   └── StoryRepositoryInterface.ts
│   └── services/              # Services domaine
│       └── StoryServiceInterface.ts
│
├── application/               # 🔄 Logique applicative
│   ├── use-cases/            # Cas d'utilisation
│   │   ├── CreateStoryUseCaseInterface.ts
│   │   └── UpdateStoryUseCaseInterface.ts
│   ├── dtos/                 # Objets de transfert
│   │   ├── CreateStoryDTOInterface.ts
│   │   └── StoryResponseDTOInterface.ts
│   └── ports/                # Ports pour l'infrastructure
│       └── StoragePortInterface.ts
│
├── infrastructure/           # 🔌 Implémentation technique
│   ├── persistence/         # Stockage des données
│   │   └── StoryRepositoryImplementation.ts
│   ├── services/           # Services externes
│   │   └── NotificationServiceImplementation.ts
│   └── config/            # Configuration
│       └── DatabaseConfig.ts
│
├── presentation/           # 🎨 Interface utilisateur
│   ├── components/        # Composants Vue.js
│   │   ├── stories/
│   │   └── shared/
│   ├── composables/       # Logique réutilisable
│   │   └── useStories.ts
│   ├── stores/           # État global
│   │   └── storyStore.ts
│   └── views/            # Pages
│       └── StoryBoard.vue
│
└── shared/               # 🔄 Code partagé
    ├── types/           # Types communs
    │   └── ResultType.ts
    ├── utils/           # Utilitaires
    │   └── validation.ts
    └── constants/       # Constantes
        └── config.ts
```

## Configuration TypeScript 🔧

### 1. tsconfig.json Détaillé

Comme le cahier des charges d'une construction, notre configuration TypeScript définit les règles précises :

```json
{
    "compilerOptions": {
        // Cible et Modules
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
        
        // Chemins et Compilation
        "baseUrl": ".",
        "rootDir": "src",
        "outDir": "dist",
        
        // Strict Mode et Vérifications
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictBindCallApply": true,
        "noImplicitThis": true,
        "useUnknownInCatchVariables": true,
        
        // Imports et Résolution
        "allowJs": false,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        
        // Décoration et Métadonnées
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        
        // Source Maps et Déclarations
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        
        // Chemins Personnalisés
        "paths": {
            "@domain/*": ["src/domain/*"],
            "@application/*": ["src/application/*"],
            "@infrastructure/*": ["src/infrastructure/*"],
            "@presentation/*": ["src/presentation/*"],
            "@shared/*": ["src/shared/*"]
        }
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

## Gestion des Paths 🛣️

### 1. Configuration des Alias

Comme un système d'adressage dans une ville, les alias de chemins facilitent la navigation dans le code :

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@domain': resolve(__dirname, './src/domain'),
            '@application': resolve(__dirname, './src/application'),
            '@infrastructure': resolve(__dirname, './src/infrastructure'),
            '@presentation': resolve(__dirname, './src/presentation'),
            '@shared': resolve(__dirname, './src/shared')
        }
    }
});
```

### 2. Utilisation des Paths

```typescript
// ❌ Imports relatifs complexes
import { StoryInterface } from '../../../domain/entities/StoryInterface';

// ✅ Imports avec alias
import { StoryInterface } from '@domain/entities/StoryInterface';
```

## Documentation 📚

### 1. Structure de la Documentation

Comme le manuel du propriétaire d'une maison, la documentation guide les développeurs :

```
docs/
├── architecture/           # Documentation architecture
│   ├── overview.md        # Vue d'ensemble
│   └── decisions/         # Décisions d'architecture
│
├── api/                   # Documentation API
│   └── endpoints.md       # Description des endpoints
│
├── guides/               # Guides développeur
│   ├── setup.md         # Guide d'installation
│   └── contributing.md  # Guide de contribution
│
└── README.md            # Documentation principale
```

### 2. Documentation du Code

```typescript
/**
 * Représente une Story dans le système.
 * Comme une pièce dans une maison, chaque Story a son propre espace et ses propres règles.
 */
interface StoryInterface {
    /** Identifiant unique de la story */
    id: string;
    
    /** Titre de la story */
    title: string;
    
    /** Statut actuel de la story */
    status: StoryStatusType;
    
    /** Valide la story selon les règles métier */
    validate(): ResultType<void>;
}

/**
 * Types de statut possibles pour une Story
 */
type StoryStatusType = 'draft' | 'in_progress' | 'completed';
```

## Conclusion 🎯

Une structure de projet bien organisée est comme une maison bien conçue :

- 🏗️ Chaque élément a sa place définie
- 📝 La documentation guide les utilisateurs
- 🔧 La configuration assure la solidité
- 🚀 Les chemins facilitent la navigation

Cette organisation nous permet de :
- Maintenir un code propre et organisé
- Faciliter l'onboarding des nouveaux développeurs
- Assurer la maintenabilité à long terme
- Favoriser la réutilisation du code

Tout comme une maison bien structurée résiste au temps, une architecture de projet bien pensée facilite l'évolution et la maintenance du code. 
