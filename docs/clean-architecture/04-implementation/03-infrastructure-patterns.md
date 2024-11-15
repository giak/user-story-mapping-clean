# Patterns de l'Infrastructure 🔌

## Vue d'ensemble

Les patterns de l'infrastructure fournissent des solutions pour implémenter les détails techniques et gérer les interactions avec les systèmes externes tout en respectant les interfaces définies par la couche domaine.

## Patterns Principaux

### 1. Pattern Repository (Implémentation) 🗄️

Implémentation concrète des interfaces de repository définies dans le domaine.

```typescript
export class StoryRepository implements StoryRepositoryInterface {
  constructor(
    private readonly apiClient: ApiClientInterface,
    private readonly cacheService: CacheServiceInterface,
    private readonly mapper: StoryMapperInterface,
    private readonly logger: LoggerInterface
  ) {}

  async findById(id: StoryId): Promise<Result<Story>> {
    try {
      // 1. Vérifier le cache
      const cached = await this.cacheService.get<StoryDTO>(`story:${id.value}`);
      if (cached) {
        this.logger.debug("Récupération depuis le cache", { id: id.value });
        return this.mapper.toDomain(cached);
      }

      // 2. Appel API
      const response = await this.apiClient.get<StoryDTO>(`/stories/${id.value}`);
      if (!response.ok) {
        return Result.fail(new RepositoryError(response.error));
      }

      // 3. Mettre en cache
      await this.cacheService.set(
        `story:${id.value}`,
        response.data,
        { ttl: 3600 }
      );

      // 4. Mapper vers le domaine
      return this.mapper.toDomain(response.data);
    } catch (error) {
      this.logger.error("Échec de récupération de la story", { id: id.value, error });
      return Result.fail(new RepositoryError("Échec de récupération de la story", error));
    }
  }

  async save(story: Story): Promise<Result<Story>> {
    try {
      // 1. Mapper vers DTO
      const dto = this.mapper.toDTO(story);

      // 2. Sauvegarder via API
      const response = await this.apiClient.post<StoryDTO>("/stories", dto);
      if (!response.ok) {
        return Result.fail(new RepositoryError(response.error));
      }

      // 3. Invalider le cache
      await this.cacheService.delete(`story:${story.id.value}`);

      // 4. Mapper la réponse vers le domaine
      return this.mapper.toDomain(response.data);
    } catch (error) {
      this.logger.error("Échec de sauvegarde de la story", { id: story.id.value, error });
      return Result.fail(new RepositoryError("Échec de sauvegarde de la story", error));
    }
  }
}
```

### 2. Pattern Gateway (Passerelle) 🌐

Abstraction des services externes derrière une interface cohérente.

```typescript
export interface ApiGatewayInterface {
  get<T>(path: string): Promise<Result<T>>;
  post<T>(path: string, data: unknown): Promise<Result<T>>;
  put<T>(path: string, data: unknown): Promise<Result<T>>;
  delete(path: string): Promise<Result<void>>;
}

export class ApiGateway implements ApiGatewayInterface {
  constructor(
    private readonly httpClient: HttpClientInterface,
    private readonly authService: AuthServiceInterface,
    private readonly errorHandler: ErrorHandlerInterface
  ) {}

  private async addAuthHeader(config: RequestConfig): Promise<RequestConfig> {
    const token = await this.authService.getToken();
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      };
    }
    return config;
  }

  async get<T>(path: string): Promise<Result<T>> {
    try {
      const config = await this.addAuthHeader({});
      const response = await this.httpClient.get<T>(path, config);
      return Result.ok(response.data);
    } catch (error) {
      return Result.fail(this.errorHandler.handle(error));
    }
  }

  async post<T>(path: string, data: unknown): Promise<Result<T>> {
    try {
      const config = await this.addAuthHeader({});
      const response = await this.httpClient.post<T>(path, data, config);
      return Result.ok(response.data);
    } catch (error) {
      return Result.fail(this.errorHandler.handle(error));
    }
  }
}
```

### 3. Pattern Adapter (Adaptateur) 🔄

Adaptation des interfaces externes vers les interfaces internes.

```typescript
export interface ExternalServiceInterface {
  fetchData<T>(config: unknown): Promise<T>;
}

export class ExternalServiceAdapter implements StoryServiceInterface {
  constructor(
    private readonly externalService: ExternalServiceInterface,
    private readonly mapper: StoryMapperInterface
  ) {}

  async getStory(id: string): Promise<Result<Story>> {
    try {
      // Adapter la configuration pour le service externe
      const externalConfig = {
        endpoint: "stories",
        id,
        version: "v2"
      };

      // Appeler le service externe
      const response = await this.externalService.fetchData(externalConfig);

      // Mapper la réponse vers notre format
      return this.mapper.toDomain(response);
    } catch (error) {
      return Result.fail(new ServiceError("Erreur du service externe", error));
    }
  }
}
```

### 4. Pattern Cache 💾

Gestion du cache avec invalidation et rafraîchissement.

```typescript
export interface CacheOptions {
  ttl?: number;
  tags?: string[];
}

export class CacheService implements CacheServiceInterface {
  constructor(
    private readonly storage: StorageInterface,
    private readonly logger: LoggerInterface
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await this.storage.get(key);
      if (!item) return null;

      const { value, expiry, tags } = item;

      // Vérifier l'expiration
      if (expiry && expiry < Date.now()) {
        await this.delete(key);
        return null;
      }

      // Vérifier l'invalidation des tags
      if (tags && await this.areTagsInvalid(tags)) {
        await this.delete(key);
        return null;
      }

      return value as T;
    } catch (error) {
      this.logger.error("Erreur de lecture du cache", { key, error });
      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    options?: CacheOptions
  ): Promise<void> {
    try {
      const item = {
        value,
        expiry: options?.ttl ? Date.now() + options.ttl * 1000 : null,
        tags: options?.tags
      };

      await this.storage.set(key, item);
    } catch (error) {
      this.logger.error("Erreur d'écriture dans le cache", { key, error });
    }
  }

  async invalidateByTags(tags: string[]): Promise<void> {
    try {
      await this.storage.set("invalidated_tags", tags);
    } catch (error) {
      this.logger.error("Erreur d'invalidation des tags", { tags, error });
    }
  }
}
```

### 5. Pattern Unit of Work (Unité de Travail) 📊

Gestion des transactions et de la cohérence des données.

```typescript
export interface UnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  complete(work: () => Promise<void>): Promise<void>;
}

export class DatabaseUnitOfWork implements UnitOfWork {
  private transaction: Transaction | null = null;

  constructor(
    private readonly db: Database,
    private readonly logger: LoggerInterface
  ) {}

  async begin(): Promise<void> {
    this.transaction = await this.db.beginTransaction();
  }

  async commit(): Promise<void> {
    if (this.transaction) {
      await this.transaction.commit();
      this.transaction = null;
    }
  }

  async rollback(): Promise<void> {
    if (this.transaction) {
      await this.transaction.rollback();
      this.transaction = null;
    }
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await this.begin();
      await work();
      await this.commit();
    } catch (error) {
      this.logger.error("Échec de la transaction", { error });
      await this.rollback();
      throw error;
    }
  }
}
```

## Bonnes Pratiques 🎯

### 1. Gestion des Erreurs

```typescript
// ✅ Bon : Transformation des erreurs
export class ApiClient {
  private handleError(error: unknown): ErrorInterface {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          return new UnauthorizedError("Non autorisé");
        case 404:
          return new NotFoundError("Ressource non trouvée");
        default:
          return new ApiError("Erreur API", error);
      }
    }
    return new UnexpectedError("Erreur inattendue", error);
  }
}
```

### 2. Logging Structuré

```typescript
// ✅ Bon : Logging structuré
export class Repository {
  async save(entity: Entity): Promise<Result<Entity>> {
    try {
      this.logger.info("Sauvegarde de l'entité", {
        id: entity.id,
        type: entity.constructor.name
      });
      // ...
    } catch (error) {
      this.logger.error("Échec de sauvegarde de l'entité", {
        id: entity.id,
        error
      });
      return Result.fail(error);
    }
  }
}
```

### 3. Configuration Typée

```typescript
// ✅ Bon : Configuration typée
export interface ApiConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retryAttempts: number;
  readonly headers: Record<string, string>;
}

export class ApiClient {
  constructor(private readonly config: ApiConfig) {}
}
```

## Anti-Patterns à Éviter ⚠️

### 1. Logique Métier dans l'Infrastructure

```typescript
// ❌ Mauvais : Logique métier dans le repository
export class StoryRepository {
  async save(story: Story) {
    if (story.points > 13) {  // ❌ Règle métier
      return Result.fail(new Error("Points trop élevés"));
    }
  }
}

// ✅ Bon : Pure infrastructure
export class StoryRepository {
  async save(story: Story) {
    return this.apiClient.post("/stories", this.mapper.toDTO(story));
  }
}
```

### 2. Cache Non Géré

```typescript
// ❌ Mauvais : Cache sans invalidation
export class CacheService {
  async set(key: string, value: unknown): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// ✅ Bon : Cache avec gestion complète
export class CacheService {
  async set(key: string, value: unknown, options?: CacheOptions): Promise<void> {
    const item = {
      value,
      expiry: options?.ttl ? Date.now() + options.ttl * 1000 : null,
      tags: options?.tags
    };
    await this.storage.set(key, item);
  }
}
```

### 3. Dépendances Hardcodées

```typescript
// ❌ Mauvais : Dépendances hardcodées
export class ApiClient {
  private axios = new Axios();  // ❌ Couplage fort
}

// ✅ Bon : Injection de dépendances
export class ApiClient {
  constructor(
    private readonly httpClient: HttpClientInterface
  ) {}
}
```

## Directives de l'Infrastructure 📋

1. Implémenter les interfaces définies par le domaine
2. Gérer proprement les erreurs et les exceptions
3. Utiliser le logging structuré pour le débogage
4. Maintenir une configuration typée et flexible
5. Éviter le couplage fort avec les services externes
6. Implémenter des mécanismes de résilience appropriés
