# Configuration Initiale 🚀

## 1. Vue d'ensemble

Ce guide détaille la mise en place d'un projet Vue.js suivant les principes de Clean Architecture, en utilisant les dernières technologies et meilleures pratiques 2024.

## 2. Prérequis 📋

### Environnement de Développement

#### Prérequis Techniques
- Node.js (v20.x LTS ou supérieur)
- pnpm (v9.12.x ou supérieur) - Gestionnaire de paquets recommandé pour :
  - Performance accrue
  - Gestion efficace des dépendances
  - Meilleure déduplication des paquets
- Git (v2.43.x ou supérieur)
- Visual Studio Code (v1.93.x ou supérieur)

#### Outils Recommandés
- Docker Desktop (optionnel)
  - Pour les conteneurs de développement
  - Pour l'isolation des services externes
  - Pour la cohérence des environnements

#### Configuration Système
- Au moins 16 Go de RAM disponible
- 2 Go d'espace disque disponible
- Processeur multi-cœur récent
- Système d'exploitation :
  - Linux (très recommandé)
  - macOS
  - Windows avec WSL2

#### Connaissances Requises
- JavaScript ES2024 / TypeScript 5.x moderne
- Vue.js 3 (Composition API)
- Principes SOLID et Clean Architecture
- Tests unitaires et d'intégration
- Git et gestion de versions


### Extensions VSCode/Cursor Essentielles

```json
{
  "recommendations": [
    // Extensions Officielles
    "Vue.volar",                                    // Support Vue 3 officiel
    "ms-playwright.playwright",                     // Tests E2E avec Playwright
    "dbaeumer.vscode-eslint",                      // Linting JavaScript/TypeScript
    "EditorConfig.EditorConfig",                   // Cohérence des styles de code
    "esbenp.prettier-vscode",                      // Formatting de code

    // Extensions Clean Architecture Recommandées
    "biomejs.biome",                               // Alternative moderne à ESLint/Prettier
    "hediet.vscode-drawio",                        // Diagrammes d'architecture
    "bierner.markdown-mermaid",                    // Documentation avec Mermaid

    // Productivité & Qualité
    "usernamehw.errorlens",                        // Visualisation des erreurs
    "eamodio.gitlens",                            // Git amélioré
    "streetsidesoftware.code-spell-checker",       // Vérification orthographique

    // Tests & Debug
    "ZixuanChen.vitest-explorer",                  // UI pour Vitest
    "rangav.vscode-thunder-client",                // Tests d'API REST

    // UI & Style
    "bradlc.vscode-tailwindcss",                  // Support Tailwind CSS
    "csstools.postcss",                           // Support PostCSS

    // IA & Assistance (Optionnel)
    "GitHub.copilot",                             // IA assistance
    "GitHub.copilot-chat",                        // Chat IA
    "Cursor.cursor"                               // Support Cursor IDE
  ]
}
```

> Note: Ces extensions sont compatibles avec VSCode et Cursor IDE. Certaines extensions sont optionnelles et peuvent être installées selon vos besoins spécifiques.

### Configuration VSCode Recommandée

```json
{
  // Organisation des fichiers
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .prettier*, prettier*, .editorconfig"
  },

  // Formatage et Actions
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // Configuration TypeScript
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // Thème Vue.js (optionnel)
  "workbench.colorCustomizations": {
    "activityBar.activeBackground": "#65c89b",
    "activityBar.background": "#65c89b",
    "activityBar.foreground": "#15202b",
    "activityBar.inactiveForeground": "#15202b99",
    "activityBarBadge.background": "#945bc4",
    "activityBarBadge.foreground": "#e7e7e7",
    "commandCenter.border": "#15202b99",
    "sash.hoverBorder": "#65c89b",
    "statusBar.background": "#42b883",
    "statusBar.foreground": "#15202b",
    "statusBarItem.hoverBackground": "#359268",
    "statusBarItem.remoteBackground": "#42b883",
    "statusBarItem.remoteForeground": "#15202b",
    "titleBar.activeBackground": "#42b883",
    "titleBar.activeForeground": "#15202b",
    "titleBar.inactiveBackground": "#42b88399",
    "titleBar.inactiveForeground": "#15202b99"
  },

  // Extensions spécifiques
  "peacock.color": "#42b883",  // Thème Vue.js

  // Configurations additionnelles recommandées pour Clean Architecture
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.eol": "\n",
  "files.associations": {
    "*.css": "postcss"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/coverage": true
  }
}
```

> Note: La configuration des couleurs est basée sur le thème Vue.js officiel. Vous pouvez la personnaliser selon vos préférences.

## 3. Création du Projet 🛠️

### Initialisation avec Vite

```bash
# Création du projet avec le template moderne
pnpm create vite clean-arch-vue -- --template vue-ts

# Navigation vers le projet
cd clean-arch-vue

# Installation des dépendances de base
pnpm install

# Initialisation de Git avec configuration moderne
git init
git config core.autocrlf false
git config core.eol lf
git config pull.rebase true
```

## 4. Dépendances du Projet 📦

### Dépendances Principales

```bash
# Core Framework
pnpm add vue@^3.5.12
pnpm add vue-router@^4.4.5
pnpm add pinia@^2.2.6

# State Management & Persistence
pnpm add pinia-plugin-persistedstate@^4.1.2

# UI Framework & Icons
pnpm add primevue@^4.2.1
pnpm add primeicons@^7.0.0

# Styling & CSS
pnpm add tailwindcss@^3.4.14
pnpm add postcss@^8.4.47
pnpm add autoprefixer@^10.4.17

# Utilities & Composables
pnpm add @vueuse/core@^11.2.0
pnpm add @vueuse/head@^2.0.0
pnpm add date-fns@^4.1.0
pnpm add vue-dndrop@^1.3.1

# Validation & Forms
pnpm add vee-validate@^4.14.6
pnpm add @vee-validate/zod@^4.14.6
pnpm add zod@^3.22.8

# Internationalization
pnpm add vue-i18n@^10.0.4
pnpm add @intlify/unplugin-vue-i18n@^5.2.0

# Dependency Injection
pnpm add inversify@^6.0.2
pnpm add reflect-metadata@^0.2.2
```

### Dépendances de Développement

```bash
# TypeScript & Type Definitions
pnpm add -D typescript@~5.6.3
pnpm add -D @types/node@^22.9.0
pnpm add -D @vue/tsconfig@^0.5.1
pnpm add -D @tsconfig/node20@^20.1.4
pnpm add -D vue-tsc@^2.1.10

# Build Tools
pnpm add -D vite@^5.4.10
pnpm add -D @vitejs/plugin-vue@^5.1.4
pnpm add -D vite-plugin-vue-devtools@^7.6.3
pnpm add -D vite-plugin-checker@^0.8.0

# Testing
pnpm add -D vitest@^2.1.4
pnpm add -D @vitest/ui@^2.1.4
pnpm add -D @vitest/coverage-v8@^2.1.4
pnpm add -D @vue/test-utils@^2.4.6
pnpm add -D @testing-library/vue@^8.1.0
pnpm add -D happy-dom@^15.10.1
pnpm add -D @playwright/test@^1.48.2

# Linting & Formatting
pnpm add -D eslint@^9.14.0
pnpm add -D @typescript-eslint/parser@^8.13.0
pnpm add -D @typescript-eslint/eslint-plugin@^8.13.0
pnpm add -D @vue/eslint-config-typescript@^14.1.3
pnpm add -D @vue/eslint-config-prettier@^10.1.0
pnpm add -D eslint-plugin-vue@^9.30.0
pnpm add -D eslint-plugin-playwright@^2.0.1
pnpm add -D prettier@^3.3.3
pnpm add -D @biomejs/biome@^1.9.4
pnpm add -D oxlint@^0.11.0
pnpm add -D eslint-plugin-oxlint@^0.11.0

# CSS Processing
pnpm add -D sass@^1.80.6
pnpm add -D postcss-preset-env@^10.0.9
pnpm add -D @tailwindcss/forms@^0.5.9
pnpm add -D @tailwindcss/typography@^0.5.15

# Utilities
pnpm add -D npm-run-all2@^7.0.1
```

> Note: Les versions spécifiées sont celles testées et validées pour ce projet. Il est recommandé de les maintenir à jour de manière contrôlée.

## 5. Configuration des Outils 🛠️

### Biome (biome.json)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error"
      },
      "suspicious": {
        "noExplicitAny": "error"
      },
      "style": {
        "useConst": "error",
        "useTemplate": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "trailingComma": "es5",
      "semicolons": "always"
    }
  }
}
```

### PostCSS (postcss.config.js)

```javascript
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
  },
}
```

### Tailwind (tailwind.config.js)

```javascript
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... autres teintes
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
```

### Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(__dirname, './src/locales/**'),
    }),
    Components({
      resolvers: [PrimeVueResolver()],
      dts: true,
    }),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@domain': resolve(__dirname, './src/contexts/*/domain'),
      '@application': resolve(__dirname, './src/contexts/*/application'),
      '@infrastructure': resolve(__dirname, './src/contexts/*/infrastructure'),
      '@presentation': resolve(__dirname, './src/contexts/*/presentation'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'pinia', 'vue-router'],
          ui: ['primevue', 'primeicons'],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self' data:;
      `,
    },
  },
})
```

## 6. Structure du Projet 📁

### Organisation des Dossiers

```bash
src/
├── contexts/           # Contextes métiers (DDD)
│   └── story/         # Exemple: Contexte Story
│       ├── domain/          # Logique métier pure
│       │   ├── entities/    # Entités et agrégats
│       │   ├── events/      # Événements domaine
│       │   ├── repositories/# Interfaces repository
│       │   └── value-objects/# Objets valeur
│       ├── application/     # Cas d'utilisation
│       │   ├── dtos/       # Objets de transfert
│       │   ├── ports/      # Ports d'entrée/sortie
│       │   ├── services/   # Services applicatifs
│       │   └── use-cases/  # Cas d'utilisation
│       ├── infrastructure/ # Implémentation technique
│       │   ├── adapters/   # Adaptateurs externes
│       │   ├── mappers/    # Mappeurs de données
│       │   ├── persistence/# Persistance des données
│       │   └── services/   # Services techniques
│       └── presentation/   # Interface utilisateur
│           ├── components/ # Composants Vue
│           ├── composables/# Logique réutilisable
│           ├── stores/     # Stores Pinia contextuels
│           └── views/      # Pages de l'application
├── shared/            # Code partagé
│   ├── core/         # Classes de base
│   │   ├── base-classes/  # Classes abstraites
│   │   ├── interfaces/    # Interfaces communes
│   │   └── types/        # Types partagés
│   ├── utils/        # Utilitaires
│   │   ├── date/         # Manipulation dates
│   │   ├── validation/   # Validations communes
│   │   └── formatting/   # Formatage données
│   └── ui/           # Composants UI
│       ├── atoms/        # Composants atomiques
│       ├── molecules/    # Composants moléculaires
│       └── organisms/    # Composants organismiques
├── store/            # Store global de l'application
│   ├── modules/      # Modules du store global
│   │   ├── app/          # État global application
│   │   ├── auth/         # Authentification globale
│   │   └── ui/           # État UI global
│   ├── plugins/      # Plugins Pinia
│   │   ├── persistence/  # Plugin persistance
│   │   └── sync/         # Plugin synchronisation
│   └── index.ts      # Configuration du store
├── infrastructure/   # Infrastructure globale
│   ├── config/       # Configuration
│   │   ├── container.ts  # Config. IoC
│   │   ├── api.ts       # Config. API
│   │   └── storage.ts   # Config. stockage
│   ├── api/          # Client API
│   │   ├── client.ts    # Client HTTP
│   │   └── interceptors/# Intercepteurs
└── assets/          # Ressources statiques
    ├── fonts/       # Polices
    ├── images/      # Images
    └── styles/      # Styles globaux
        ├── base/        # Styles de base
        ├── components/  # Styles composants
        └── utilities/   # Classes utilitaires
```

## 7. Scripts NPM 📦

```json
{
  "scripts": {
    // Développement
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",

    // Tests
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",

    // Qualité de code
    "lint": "biome check .",
    "lint:fix": "biome check --apply .",
    "format": "biome format .",
    "format:fix": "biome format --write .",
    "type-check": "vue-tsc --noEmit",

    // Validation
    "validate": "pnpm run lint && pnpm run type-check && pnpm run test",
    "pre-commit": "pnpm run validate",

    // Analyse
    "analyze": "vite build --mode analyze",
    "analyze:deps": "npx depcheck",

    // Utilitaires
    "clean": "rimraf dist node_modules",
    "clean:cache": "rimraf node_modules/.cache",
    "update-deps": "pnpm update --latest"
  }
}
```

## 8. Configuration Git 🔄

### .gitignore

```gitignore
# Dépendances
node_modules
.pnpm-store

# Build
dist
dist-ssr
*.local

# Tests et Couverture
coverage
playwright-report
test-results

# Logs et Debug
logs
*.log
npm-debug.log*
pnpm-debug.log*
.pnpm-debug.log*

# Éditeur
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Système
.DS_Store
Thumbs.db

# Environnement
.env
.env.*
!.env.example

# Analyse et Performance
stats.html
.lighthouse
bundle-stats.json
```

### Git Hooks (avec Husky)

```bash
pnpm add -D husky lint-staged

# Initialisation de Husky
pnpm husky install

# Configuration des hooks
pnpm husky add .husky/pre-commit "pnpm lint-staged"
pnpm husky add .husky/pre-push "pnpm test"
```

### Configuration lint-staged

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["biome check --apply", "biome format --write"],
    "*.{json,md}": ["biome format --write"]
  }
}
```

## 9. Docker Development 🐳

### Dockerfile.dev

```dockerfile
FROM node:20.11-alpine

WORKDIR /app

# Installation de pnpm
RUN corepack enable && corepack prepare pnpm@8.15.1 --activate

# Installation des dépendances système
RUN apk add --no-cache git

# Copie des fichiers de configuration
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install --frozen-lockfile

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["pnpm", "dev"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:8080
    command: pnpm dev
```

## 10. Sécurité et Performance 🔒

### Configuration CSP

```typescript
// src/infrastructure/config/security.ts
export const securityConfig = {
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      fontSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", 'https://api.example.com'],
    },
  },
  cors: {
    origin: process.env.VITE_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
}
```

### Optimisations de Performance

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'pinia', 'vue-router'],
          ui: ['primevue', 'primeicons'],
          utils: ['@vueuse/core', 'date-fns'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['vue', 'pinia', 'vue-router', 'primevue'],
    exclude: ['@vueuse/core'],
  },
})
```

## 11. Validation et Tests 🧪

### Configuration Vitest

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{js,ts,vue}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*', '**/index.ts'],
    },
    deps: {
      inline: ['vue', '@vue', '@vueuse', 'primevue'],
    },
  },
})
```

### Configuration Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
```

