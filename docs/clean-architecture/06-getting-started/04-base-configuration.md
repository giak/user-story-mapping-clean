# Configuration de Base 🔧

## 1. Types de Base

### Result Pattern
```typescript
// src/shared/core/Result.ts
export interface ResultInterface<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error?: ErrorInterface;
  value?: T;
}

export class Result<T> implements ResultInterface<T> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _error?: ErrorInterface,
    private readonly _value?: T
  ) {
    Object.freeze(this);
  }

  get isSuccess(): boolean { return this._isSuccess; }
  get isFailure(): boolean { return !this._isSuccess; }
  get error(): ErrorInterface | undefined { return this._error; }
  get value(): T | undefined { return this._value; }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: ErrorInterface): Result<U> {
    return new Result<U>(false, error);
  }
}
```

### Error Handling
```typescript
// src/shared/core/errors.ts
export interface ErrorInterface {
  readonly message: string;
  readonly code: string;
  readonly stack?: string;
  readonly cause?: unknown;
}

export class DomainError implements ErrorInterface {
  public readonly code: string;
  public readonly stack?: string;

  constructor(
    public readonly message: string,
    public readonly cause?: unknown
  ) {
    this.code = this.constructor.name;
    this.stack = new Error().stack;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, cause?: unknown) {
    super(`Validation error: ${message}`, cause);
  }
}

export class ApplicationError extends DomainError {
  constructor(message: string, cause?: unknown) {
    super(`Application error: ${message}`, cause);
  }
}

export class InfrastructureError extends DomainError {
  constructor(message: string, cause?: unknown) {
    super(`Infrastructure error: ${message}`, cause);
  }
}
```

## 2. Configuration API

### API Client
```typescript
// src/infrastructure/api/client.ts
import { inject, injectable } from 'inversify';
import { Result } from '@shared/core/Result';
import { ErrorHandler } from '@shared/core/ErrorHandler';
import { API_CONFIG } from './config';

@injectable()
export class ApiClient {
  constructor(
    @inject(ErrorHandler) private readonly errorHandler: ErrorHandler
  ) {}

  async get<T>(url: string): Promise<Result<T>> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        headers: API_CONFIG.DEFAULT_HEADERS,
        credentials: 'include'
      });
      
      if (!response.ok) {
        return Result.fail(this.errorHandler.handleHttpError(response));
      }

      const data = await response.json();
      return Result.ok(data);
    } catch (error) {
      return Result.fail(this.errorHandler.handle(error));
    }
  }

  async post<T>(url: string, data: unknown): Promise<Result<T>> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        return Result.fail(this.errorHandler.handleHttpError(response));
      }

      const responseData = await response.json();
      return Result.ok(responseData);
    } catch (error) {
      return Result.fail(this.errorHandler.handle(error));
    }
  }
}
```

### API Configuration
```typescript
// src/infrastructure/api/config.ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error occurred',
    TIMEOUT_ERROR: 'Request timed out',
    SERVER_ERROR: 'Server error occurred',
    UNKNOWN_ERROR: 'An unknown error occurred'
  }
} as const;
```

## 3. Configuration du Router

```typescript
// src/infrastructure/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { setupAuthGuard } from './guards/auth.guard';
import { setupErrorHandler } from './handlers/error.handler';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/presentation/views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/stories',
    component: () => import('@/contexts/story/presentation/views/StoryListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/presentation/views/NotFoundView.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

// Configuration des guards et handlers
setupAuthGuard(router);
setupErrorHandler(router);

export default router;
```

## 4. Configuration de Pinia

```typescript
// src/infrastructure/store/index.ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { markRaw } from 'vue';
import type { Router } from 'vue-router';

export function setupStore(router: Router) {
  const pinia = createPinia();
  
  // Plugin de persistance
  pinia.use(piniaPluginPersistedstate);
  
  // Ajout du router dans le store
  pinia.use(({ store }) => {
    store.$router = markRaw(router);
  });

  // Plugin de reset
  pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => store.$patch(initialState);
  });

  return pinia;
}
```

## 5. Configuration des Tests

```typescript
// src/test/setup.ts
import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

// Configuration globale des tests
config.global.plugins = [
  createTestingPinia({
    createSpy: vi.fn
  })
];

// Mocks globaux
config.global.mocks = {
  $t: (key: string) => key,
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  }
};

// Configuration des stubs
config.global.stubs = {
  RouterLink: true,
  RouterView: true
};

// Mock des variables d'environnement
vi.mock('@/config/env', () => ({
  API_URL: 'http://localhost:3000'
}));
```

## 6. Configuration de l'Application

```typescript
// src/main.ts
import { createApp } from 'vue';
import { container } from '@/infrastructure/config/container';
import { router } from '@/infrastructure/router';
import { setupStore } from '@/infrastructure/store';
import { setupErrorHandler } from '@/infrastructure/error/handler';
import App from './App.vue';

// Création de l'application
const app = createApp(App);

// Configuration des plugins
const pinia = setupStore(router);
app.use(pinia);
app.use(router);

// Configuration des handlers globaux
setupErrorHandler(app);

// Injection du conteneur IoC
app.provide('container', container);

// Montage de l'application
app.mount('#app');
```

## 7. Configuration de l'Environnement

```typescript
// src/infrastructure/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_TITLE: z.string(),
  VITE_AUTH_ENABLED: z.string().transform(val => val === 'true')
});

export const ENV = envSchema.parse(import.meta.env);
```

## 8. Configuration des Composants de Base

```typescript
// src/shared/ui/components/BaseButton.vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--disabled': disabled || loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__loader" />
    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  @apply rounded-md px-4 py-2 font-medium transition-colors;
  
  &--primary {
    @apply bg-primary-600 text-white hover:bg-primary-700;
  }
  
  &--disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>