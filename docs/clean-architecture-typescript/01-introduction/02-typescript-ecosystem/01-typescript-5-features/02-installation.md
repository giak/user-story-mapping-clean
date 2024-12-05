# Installation du Projet 🏗️

> *"Comme la construction d'une maison progresse des fondations vers le toit, notre projet se construit étape par étape avec des outils et configurations appropriés."*

## Prérequis 📋

Assurez-vous d'avoir configuré votre environnement selon le [guide d'environnement](./01-environment.md) :
- Node.js (v22.12.0+)
- pnpm (v9.14.4+)
- Git (v2.43+)
- VSCode ou Cursor IDE

## 1. Création du Projet avec Vite 🚀

Tout comme un architecte dispose de plusieurs approches pour démarrer la construction d'une maison, Vite nous offre différentes méthodes pour initialiser notre projet. Voici la méthode recommandée :

### A. Installation de Vite 🛠️

Commençons par installer Vite globalement :

```bash
# Installation globale de Vite
pnpm add -g create-vite@latest

# Vérification de l'installation
create-vite --version    # Devrait afficher 5.0.0 ou supérieur
```

### B. Création via Template 📋

```bash
# Méthode interactive (recommandée)
pnpm create vite

# Ou directement avec les options
pnpm create vite clean-architecture-demo -- --template vue-ts
```

> 💡 **Note**: L'option `--template vue-ts` combine Vue.js et TypeScript, idéal pour notre architecture.

### C. Templates Disponibles 🎯

Vite propose plusieurs templates officiels pour TypeScript :
- `vue` puis `typescript`: choisir ce template

### D. Installation et Configuration 🔧

```bash
# Navigation dans le dossier
cd clean-architecture-demo

# Installation des dépendances
pnpm install

# Installation des dépendances TypeScript essentielles
pnpm add -D typescript@5.7.2 \           # TypeScript lui-même
         @types/node@22.10.1 \           # Types pour Node.js
         vue-tsc@2.1.10 \                # Vérification des types Vue
         @vitejs/plugin-vue@5.2.4 \      # Plugin Vue pour Vite
         @vue/tsconfig@0.7.0 \           # Configuration TypeScript pour Vue
         @vue/runtime-core@3.5.13 \      # Types Vue core
         @types/web@0.0.186             # Types Web API
```

> 💡 **Note**: Ces versions sont compatibles avec Vue 3.4+ et TypeScript 5.7+

### Configuration de Vite pour TypeScript

Créez ou mettez à jour `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
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
})
```

> 💡 **Note**: Cette configuration initiale sera enrichie ultérieurement pour supporter des alias dynamiques par contexte métier. Cela permettra d'avoir des imports plus explicites comme `@user/domain` ou `@product/infrastructure`, facilitant ainsi la navigation dans notre architecture modulaire basée sur les contextes.

> 🔄 **Évolution Prévue**: 
> - Ajout d'alias automatiques pour chaque nouveau contexte
> - Support des sous-dossiers spécifiques par contexte
> - Meilleure organisation des imports entre contextes

## 2. Configuration TypeScript 🔧

> 💡 **Note**: Comme pour les fondations d'une maison qui doivent être solides, la configuration TypeScript doit être rigoureuse pour garantir la stabilité de notre application.

### A. Configuration du Compilateur

Créez ou mettez à jour `tsconfig.json` :

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

Créez ou mettez à jour `tsconfig.app.json` :

```json
{
  "compilerOptions": {
    /* Paramètres de Base */
    "target": "ES2024",                  // Version ECMAScript cible
    "module": "ESNext",                  // Système de modules
    "lib": ["ES2024", "DOM", "DOM.Iterable"],
    "useDefineForClassFields": true,     // Support des champs de classe
    "skipLibCheck": true,                // Optimisation de la vérification

    /* Paramètres du Bundler */
    "moduleResolution": "bundler",       // Résolution des modules optimisée pour Vite
    "allowImportingTsExtensions": true,  // Permet l'import de fichiers .ts
    "resolveJsonModule": true,           // Support des imports JSON
    "isolatedModules": true,            // Garantit la compatibilité avec les bundlers
    "noEmit": true,                     // Pas d'émission de fichiers JS (géré par Vite)
    "jsx": "preserve",                  // Préserve le JSX pour Vue

    /* Vérifications Strictes */
    "strict": true,                     // Active toutes les vérifications strictes
    "noUnusedLocals": true,            // Détecte les variables non utilisées
    "noUnusedParameters": true,         // Détecte les paramètres non utilisés
    "noFallthroughCasesInSwitch": true, // Vérification exhaustive des switch
    "useUnknownInCatchVariables": true, // Type 'unknown' pour les catch
    "noUncheckedIndexedAccess": true,   // Vérification stricte des index
    "exactOptionalPropertyTypes": true,  // Typage strict des propriétés optionnelles
    "noImplicitOverride": true,         // Obligation du mot-clé override
    "noPropertyAccessFromIndexSignature": true,
    "forceConsistentCasingInFileNames": true,

    /* Chemins et Résolution */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"],
      "@shared/*": ["src/shared/*"],
      "@contexts/*": ["src/contexts/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### B. Configuration Node.js

Créez ou mettez à jour `tsconfig.node.json` :

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": [
    "vite.config.ts",
    "vitest.config.ts",
    "cypress.config.ts"
  ]
}
```

> 🔧 **Note Technique**: Cette configuration est optimisée pour:
> - La dernière version d'ECMAScript (ES2024)
> - Une vérification de types stricte
> - Une intégration optimale avec Vite
> - Un support complet de notre architecture en couches

> ⚠️ **Important**: Les chemins dans `paths` doivent correspondre exactement à la structure de votre projet. Ajustez-les selon vos besoins.

## 3. Structure du Projet 📁

```bash
# Création de la structure de base
mkdir -p src/{assets,contexts,docs,infrastructure,initialization,presentation,shared,store,workers}

# Structure minimale des assets
mkdir -p src/assets/styles/scss

# Structure minimale partagée
mkdir -p src/shared/{core/{base-classes,interfaces,types},utils}

# Structure minimale de l'infrastructure
mkdir -p src/infrastructure/{config,services}

# Structure minimale de la présentation
mkdir -p src/presentation/{components,views}

# Structure minimale pour l'initialisation
mkdir -p src/initialization/plugins

# Structure minimale pour le store
mkdir -p src/store/modules

# Exemple minimal d'un contexte
mkdir -p src/contexts/example/{domain,application,infrastructure,presentation}
```

> 💡 **Note**: Cette structure de base sera enrichie progressivement selon les besoins du projet.

Structure initiale :

```
src/
├── assets/              # Ressources statiques
│   └── styles/         # Styles globaux
│       └── scss/      # Modules SCSS
│
├── contexts/          # Domaines métier isolés
│   └── example/      # Exemple de contexte
│       ├── domain/        # Cœur métier
│       ├── application/   # Cas d'utilisation
│       ├── infrastructure/# Adaptateurs
│       └── presentation/  # Interface UI
│
├── infrastructure/   # Configuration globale
│   ├── config/      # Configurations
│   └── services/    # Services techniques
│
├── initialization/  # Bootstrap application
│   └── plugins/    # Plugins Vue.js
│
├── presentation/   # Composants partagés
│   ├── components/ # Composants UI
│   └── views/     # Pages partagées
│
├── shared/        # Code partagé
│   ├── core/     # Classes et interfaces base
│   └── utils/    # Utilitaires
│
└── store/        # État global (Pinia)
    └── modules/  # Modules de store
```

> ⚠️ **Important**: Cette structure initiale fournit les bases essentielles pour démarrer. Elle sera enrichie au fur et à mesure du développement du projet. Il faut déjà s'habituer à cette arborescence.

## 4. Installation des Dépendances 📦

```bash
# Dépendances de production essentielles
pnpm install vue@3.4.15 vue-router@4.2.5 pinia@2.1.7 @vueuse/core@10.7.2

# Dépendances UI et composants
pnpm install primevue@3.48.1 @headlessui/vue@1.7.19 @heroicons/vue@2.1.1

# Support i18n
pnpm install vue-i18n@9.9.0

# Utilitaires
pnpm install date-fns@3.3.1 zod@3.22.4 axios@1.6.7

# Dépendances de développement pour les tests
pnpm install -D vitest@1.2.2 @vitest/coverage-v8@0.34.6 
pnpm install -D @testing-library/vue@8.0.1 @testing-library/jest-dom@6.4.2
pnpm install -D @vue/test-utils@2.4.4 happy-dom@13.3.8

# Dépendances de développement pour le linting et le formatting
pnpm install -D eslint@8.56.0 @typescript-eslint/parser@6.19.1 
pnpm install -D @typescript-eslint/eslint-plugin@6.19.1 eslint-plugin-vue@9.20.1
pnpm install -D prettier@3.2.4 eslint-config-prettier@9.1.0 eslint-plugin-prettier@5.1.3

# Dépendances de développement pour le style
pnpm install -D tailwindcss@3.4.1 postcss@8.4.33 autoprefixer@10.4.17
pnpm install -D sass@1.70.0
```

> 💡 **Note**: Ces dépendances sont organisées par catégorie pour une meilleure lisibilité et maintenance.

### Explications des dépendances principales

**Production**:
- `vue`: Framework principal
- `vue-router`: Routage officiel de Vue
- `pinia`: Gestion d'état
- `@vueuse/core`: Collection d'utilitaires composables Vue
- `primevue`: Bibliothèque de composants UI
- `zod`: Validation de schémas TypeScript
- `vue-i18n`: Internationalisation

**Développement**:
- `vitest`: Framework de test moderne
- `@testing-library/vue`: Utilitaires de test pour Vue
- `eslint` et plugins: Linting du code
- `prettier`: Formatage du code
- `tailwindcss`: Framework CSS utilitaire
- `sass`: Préprocesseur CSS

> ⚠️ **Important**: Les versions spécifiées sont compatibles entre elles et testées. Mettez à jour avec précaution.

## 5. Configuration des Tests 🧪

Créez `vitest.config.ts` :

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts'
      ]
    },
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist']
  },
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, './src/domain'),
      '@application': path.resolve(__dirname, './src/application'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@presentation': path.resolve(__dirname, './src/presentation'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
```

## 6. Scripts npm 📝

Mettez à jour `package.json` :

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "lint": "eslint src --ext .ts,.tsx,.vue",
    "lint:fix": "eslint src --ext .ts,.tsx,.vue --fix",
    "type-check": "vue-tsc --noEmit",
    "format": "prettier --write src/"
  }
}
```

## 7. Configuration ESLint 📐

```bash
pnpm install -D eslint@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest eslint-plugin-vue@latest
```

Créez `.eslintrc.json` :

```json
{
  "root": true,
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "ecmaVersion": 2024
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:vue/vue3-recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/prefer-readonly": "error"
  }
}
```

## 8. Vérification de l'Installation ✅

```bash
# Démarrage du serveur de développement
pnpm run dev

# Exécution des tests
pnpm run test

# Vérification des types
pnpm run type-check

# Vérification du linting
pnpm run lint
```

## Points Clés à Retenir 🎯

1. **Versions Modernes** 🚀
   - Node.js 22.12.0+ pour les dernières fonctionnalités
   - TypeScript 5.7.2+ pour le typage avancé
   - Vue 3 pour la réactivité moderne

2. **Configuration Stricte** 🛡️
   - TypeScript en mode strict
   - ESLint avec règles avancées
   - Tests complets avec Vitest

3. **Structure Propre** 📐
   - Architecture en couches
   - Séparation des responsabilités
   - Organisation modulaire

## Pour Aller Plus Loin 📚

- Configurer un système CI/CD
- Ajouter des outils d'analyse de code
- Mettre en place des hooks git
- Configurer Docker pour le développement

## Conclusion 🏠

Comme une maison moderne nécessite les dernières normes de construction, notre projet utilise :
- Les dernières versions des outils (Node.js 22.12.0+, TypeScript 5.7.2+)
- Une configuration robuste et stricte
- Des outils de qualité modernes
- Une structure claire et maintenable
