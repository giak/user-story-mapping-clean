# Pratiques Spécifiques aux Couches 🎯

## Couche Domaine 🏛️

### 1. Modélisation du Domaine

```typescript
// ✅ Bon : Modèle riche avec comportement
export class Story extends AggregateRoot<StoryId> {
  private constructor(private readonly props: StoryProps) {
    super();
    this.validate();
  }

  public static create(props: StoryProps): Result<Story> {
    return Result.ok(new Story(props));
  }

  public peutEtreDeplaceeVersSprint(): boolean {
    return this.estEstimee() && 
           this.aCriteresAcceptation() && 
           !this.estBloquee();
  }

  private validate(): void {
    if (!this.props.titre || this.props.titre.length < 3) {
      throw new ValidationError("Le titre doit contenir au moins 3 caractères");
    }
  }
}

// ❌ Mauvais : Modèle anémique
export class Story {
  public titre: string;
  public statut: string;
  public points: number;

  setTitre(titre: string): void {
    this.titre = titre;
  }
}
```

### 2. Objets Valeur

```typescript
// ✅ Bon : Objet valeur immutable
export class StoryPoints extends ValueObject<{ value: number }> {
  private static readonly POINTS_VALIDES = [1, 2, 3, 5, 8, 13, 21];

  private constructor(props: { value: number }) {
    super(props);
    this.validate();
    Object.freeze(this);
  }

  public static create(points: number): Result<StoryPoints> {
    return Result.ok(new StoryPoints({ value: points }));
  }

  public estEffortImportant(): boolean {
    return this.value > 8;
  }
}

// ❌ Mauvais : Utilisation de primitifs
export class Story {
  constructor(
    public points: number  // Devrait être un Objet Valeur
  ) {}
}
```

## Couche Application 🔄

### 1. Cas d'Utilisation

```typescript
// ✅ Bon : Cas d'utilisation focalisé
export class CreateStoryUseCase {
  constructor(
    private readonly repository: StoryRepositoryInterface,
    private readonly eventBus: EventBusInterface
  ) {}

  async execute(request: CreateStoryDTO): Promise<Result<StoryDTO>> {
    // 1. Validation
    const validationResult = await this.validator.validate(request);
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }

    // 2. Création
    const storyResult = await Story.create({
      titre: request.titre,
      description: request.description
    });

    if (storyResult.isFailure) {
      return Result.fail(storyResult.error);
    }

    // 3. Persistence
    const saveResult = await this.repository.save(storyResult.value);
    if (saveResult.isFailure) {
      return Result.fail(saveResult.error);
    }

    // 4. Événement
    await this.eventBus.publish(new StoryCreatedEvent(saveResult.value));

    // 5. Retour
    return Result.ok(StoryMapper.toDTO(saveResult.value));
  }
}

// ❌ Mauvais : Cas d'utilisation avec logique métier
export class CreateStoryUseCase {
  execute(request: CreateStoryDTO) {
    if (request.points > 13) { // ❌ Logique métier ici
      return Result.fail(new Error("Points trop élevés"));
    }
  }
}
```

### 2. DTOs

```typescript
// ✅ Bon : DTOs spécifiques
export interface CreateStoryDTO {
  titre: string;
  description: string;
}

export interface UpdateStoryStatusDTO {
  id: string;
  statut: StoryStatus;
}

// ❌ Mauvais : DTO générique
export interface StoryDTO {
  [key: string]: any;  // Trop permissif
}
```

## Couche Infrastructure 🔌

### 1. Repositories

```typescript
// ✅ Bon : Repository avec gestion des erreurs
export class StoryRepository implements StoryRepositoryInterface {
  constructor(
    private readonly api: ApiClientInterface,
    private readonly cache: CacheServiceInterface,
    private readonly logger: LoggerInterface
  ) {}

  async findById(id: StoryId): Promise<Result<Story>> {
    try {
      // Vérifier le cache
      const cached = await this.cache.get<StoryDTO>(`story:${id.value}`);
      if (cached) {
        return Result.ok(this.mapper.toDomain(cached));
      }

      // Appel API
      const response = await this.api.get(`/stories/${id.value}`);
      if (!response.ok) {
        return Result.fail(new RepositoryError(response.error));
      }

      // Cache & retour
      await this.cache.set(`story:${id.value}`, response.data);
      return Result.ok(this.mapper.toDomain(response.data));
    } catch (error) {
      this.logger.error("Échec de récupération de la story", { id: id.value, error });
      return Result.fail(new RepositoryError("Échec de récupération de la story", error));
    }
  }
}

// ❌ Mauvais : Repository sans gestion d'erreur
export class StoryRepository {
  async findById(id: string): Promise<Story> {
    const response = await fetch(`/api/stories/${id}`);
    return response.json();
  }
}
```

### 2. Mappers

```typescript
// ✅ Bon : Mapper avec validation
export class StoryMapper implements MapperInterface<Story, StoryDTO> {
  toDomain(dto: StoryDTO): Result<Story> {
    try {
      const storyResult = Story.create({
        id: StoryId.create(dto.id),
        titre: dto.titre,
        description: dto.description,
        statut: StoryStatus.create(dto.statut)
      });

      if (storyResult.isFailure) {
        return Result.fail(new MapperError("Données de story invalides", storyResult.error));
      }

      return Result.ok(storyResult.value);
    } catch (error) {
      return Result.fail(new MapperError("Échec de mapping de la story", error));
    }
  }

  toDTO(domain: Story): StoryDTO {
    return {
      id: domain.id.value,
      titre: domain.titre,
      description: domain.description,
      statut: domain.statut.value
    };
  }
}

// ❌ Mauvais : Mapper sans validation
export class StoryMapper {
  toDomain(dto: any): Story {
    return new Story(dto);
  }
}
```

## Couche Présentation 🎨

### 1. Composants

```typescript
// ✅ Bon : Composant de présentation pure
export const StoryCard = defineComponent({
  props: {
    story: {
      type: Object as PropType<StoryDTO>,
      required: true
    }
  },
  setup(props, { emit }) {
    const statusColor = computed(() => {
      switch (props.story.statut) {
        case "A_FAIRE": return "bg-gray-100";
        case "EN_COURS": return "bg-blue-100";
        case "TERMINE": return "bg-green-100";
        default: return "bg-gray-100";
      }
    });

    return () => (
      <div class={["story-card", statusColor.value]}>
        <h3>{props.story.titre}</h3>
        <p>{props.story.description}</p>
      </div>
    );
  }
});

// ❌ Mauvais : Mélange présentation et logique
export const StoryCard = defineComponent({
  setup() {
    const store = useStoryStore();
    
    async function calculerPriorite() {  // ❌ Logique métier
      const points = await store.fetchStoryPoints();
      return points > 8 ? "Haute" : "Basse";
    }
  }
});
```

### 2. Composables

```typescript
// ✅ Bon : Composable réutilisable
export function useStory(id: string) {
  const store = useStoryStore();
  const { t } = useI18n();
  const toast = useToast();

  const story = computed(() => store.getStoryById(id));
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  async function fetchStory() {
    try {
      isLoading.value = true;
      await store.fetchStory(id);
    } catch (e) {
      error.value = e as Error;
      toast.error(t("errors.fetchFailed"));
    } finally {
      isLoading.value = false;
    }
  }

  return {
    story,
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchStory
  };
}

// ❌ Mauvais : État global dans le composable
const etatGlobal = ref({});  // ❌ État global
export function useEtatGlobal() {
  return etatGlobal;
}
```

### 3. Stores

```typescript
// ✅ Bon : Store avec gestion d'état claire
export const useStoryStore = defineStore('story', {
  state: (): StoryState => ({
    stories: new Map(),
    storyActuelle: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getStoryById: (state) => {
      return (id: string) => state.stories.get(id);
    }
  },

  actions: {
    async fetchStory(id: string) {
      try {
        this.isLoading = true;
        this.error = null;
        const result = await this.storyService.fetchStory(id);
        if (result.isSuccess) {
          this.stories.set(id, result.value);
        }
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

// ❌ Mauvais : Store avec logique métier
export const useStoryStore = defineStore('story', {
  actions: {
    calculerPriorite(story: Story) {  // ❌ Logique métier dans le store
      return story.points > 8 ? "Haute" : "Basse";
    }
  }
});
```

## Directives par Couche 📋

### Couche Domaine
1. Implémenter des modèles riches avec comportement
2. Utiliser des objets valeur pour les concepts du domaine
3. Encapsuler la logique métier
4. Maintenir l'invariance et la cohérence

### Couche Application
1. Orchestrer les cas d'utilisation
2. Déléguer la logique métier au domaine
3. Utiliser des DTOs pour les transferts de données
4. Gérer les erreurs de manière cohérente

### Couche Infrastructure
1. Implémenter les interfaces du domaine
2. Gérer les détails techniques
3. Assurer la persistance et la communication
4. Maintenir la résilience et la performance

### Couche Présentation
1. Séparer la présentation de la logique
2. Utiliser des composables pour la réutilisation
3. Gérer l'état de manière appropriée
4. Optimiser les performances de rendu
