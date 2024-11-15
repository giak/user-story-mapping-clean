# Configuration TypeScript 🔧

## 1. Configuration de Base

### tsconfig.json Principal
```json
{
  "compilerOptions": {
    // Environnement et Modules
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "moduleResolution": "Bundler",
    "useDefineForClassFields": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "allowJs": true,
    "checkJs": true,

    // Strict Mode et Vérifications
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "noEmit": true,

    // Imports et Résolution
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@domain/*": ["./src/contexts/*/domain"],
      "@application/*": ["./src/contexts/*/application"],
      "@infrastructure/*": ["./src/contexts/*/infrastructure"],
      "@presentation/*": ["./src/contexts/*/presentation"],
      "@shared/*": ["./src/shared/*"]
    },
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "allowArbitraryExtensions": true,

    // Interopérabilité
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,

    // Vue.js
    "jsx": "preserve",
    "jsxImportSource": "vue",

    // Décorateurs
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "vitest.config.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage"
  ]
}
```

## 2. Types Globaux

```typescript
// src/types/global.d.ts
declare global {
  // Types d'environnement
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_AUTH_ENABLED: string;
    readonly VITE_SENTRY_DSN?: string;
    readonly VITE_GA_ID?: string;
  }

  // Types Vue
  declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }

  // Augmentation de Vue
  declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $config: AppConfig;
      $api: ApiService;
      $logger: LoggerService;
    }

    interface ComponentCustomOptions {
      persistState?: boolean;
      layout?: string;
    }
  }

  // Types utilitaires globaux
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
  type Primitive = string | number | boolean | null | undefined;
  type DeepPartial<T> = T extends Primitive
    ? T
    : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends Map<infer K, infer V>
    ? Map<DeepPartial<K>, DeepPartial<V>>
    : T extends Set<infer U>
    ? Set<DeepPartial<U>>
    : { [P in keyof T]?: DeepPartial<T[P]> };
}

export {};
```

## 3. Types Utilitaires Modernes

```typescript
// src/shared/types/utils.ts

// Type pour les valeurs non nullables
export type NonNullable<T> = T extends null | undefined ? never : T;

// Type pour les objets en lecture seule profonde
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

// Type pour les objets partiels profonds
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object 
    ? DeepPartial<T[P]> 
    : T[P];
};

// Type pour les promesses avec timeout
export type PromiseWithTimeout<T> = Promise<T> & {
  timeout(ms: number): Promise<T>;
};

// Type pour les fonctions asynchrones
export type AsyncFunction<T = void> = (...args: any[]) => Promise<T>;

// Type pour les handlers d'événements typés
export type TypedEventHandler<T extends Event> = (event: T) => void;

// Type pour les records avec clés spécifiques
export type TypedRecord<K extends string | number, T> = {
  [P in K]: T;
};

// Type pour les validateurs
export type Validator<T> = (value: unknown) => value is T;

// Type pour les constructeurs
export type Constructor<T = any> = new (...args: any[]) => T;

// Type pour les fonctions de mapping
export type Mapper<T, U> = (input: T) => U;

// Type pour les résultats d'opération
export type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

// Type pour les identifiants
export type ID = string & { readonly brand: unique symbol };

// Type pour les DTOs
export type DTO<T> = {
  [P in keyof T]: T[P] extends Date 
    ? string 
    : T[P] extends object
    ? DTO<T[P]>
    : T[P];
};
```

## 4. Configuration ESLint Moderne

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // TypeScript
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',

    // Imports
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type'
      ],
      'newlines-between': 'always',
      'alphabetize': { 'order': 'asc' }
    }],
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
}
```

## 5. Bonnes Pratiques TypeScript 🎯

### Utilisation des Types Stricts
```typescript
// ✅ Bon : Types explicites et stricts
type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

function createUser(id: UserId, email: Email): User {
  return { id, email };
}

// ❌ Mauvais : Types trop permissifs
function createUser(id: string, email: string): User {
  return { id, email };
}
```

### Utilisation des Generics
```typescript
// ✅ Bon : Generics avec contraintes
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ❌ Mauvais : Type any
function getProperty(obj: any, key: string): any {
  return obj[key];
}
```

### Pattern Builder Typé
```typescript
class UserBuilder {
  private user: Partial<User> = {};

  withName(name: string): this {
    this.user.name = name;
    return this;
  }

  withEmail(email: Email): this {
    this.user.email = email;
    return this;
  }

  build(): User {
    if (!this.user.name || !this.user.email) {
      throw new Error('User is incomplete');
    }
    return this.user as User;
  }
}
```

### Types d'Utilitaires Modernes
```typescript
// Types conditionnels
type IsArray<T> = T extends Array<any> ? true : false;

// Types mappés avec modificateurs
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Types avec template literal
type CSSProperty = `${string}-${string}`;
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/${string}`;
type APIRoute = `${HTTPMethod} ${Endpoint}`;
```

## 6. Patterns de Typage Avancés

### Pattern Result
```typescript
type Result<T, E = Error> = Success<T> | Failure<E>;

interface Success<T> {
  readonly type: 'success';
  readonly value: T;
}

interface Failure<E> {
  readonly type: 'failure';
  readonly error: E;
}

function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.type === 'success';
}
```

### Pattern State Machine
```typescript
type State = 'idle' | 'loading' | 'success' | 'error';
type Action = 'FETCH' | 'RESOLVE' | 'REJECT' | 'RESET';

type StateMachine = {
  [K in State]: {
    [A in Action]?: State;
  };
};

const machine: StateMachine = {
  idle: { FETCH: 'loading' },
  loading: {
    RESOLVE: 'success',
    REJECT: 'error'
  },
  success: { RESET: 'idle' },
  error: { RESET: 'idle' }
};
```

### Pattern Validator
```typescript
interface Validator<T> {
  validate(value: unknown): value is T;
  errors(): string[];
}

class UserValidator implements Validator<User> {
  private _errors: string[] = [];

  validate(value: unknown): value is User {
    this._errors = [];
    
    if (!value || typeof value !== 'object') {
      this._errors.push('Value must be an object');
      return false;
    }

    // Validation logic...
    
    return this._errors.length === 0;
  }

  errors(): string[] {
    return [...this._errors];
  }
}
```

## 7. Tests avec TypeScript

### Configuration Vitest
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/'],
    },
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
```

### Types pour les Tests
```typescript
// src/test/types.ts
import type { Component } from 'vue';
import type { Mock } from 'vitest';

export interface MockComponent extends Component {
  mock: Mock;
}

export interface TestContext {
  component: Component;
  props?: Record<string, unknown>;
  slots?: Record<string, unknown>;
}

export type TestFactory = (context: TestContext) => void;
```
