# Patterns de la Couche Présentation 🎨

## Vue d'ensemble

Les patterns de la présentation définissent comment organiser et structurer la couche interface utilisateur de l'application en utilisant Vue.js et son écosystème (Pinia, Vue Router, etc.).

## Patterns Principaux

### 1. Pattern Composable 🔄

Les composables encapsulent et réutilisent la logique des composants.

```typescript
// useStory.ts
export function useStory(id: string) {
  const store = useStoryStore();
  const { t } = useI18n();
  const toast = useToast();
  
  const story = computed(() => store.getStoryById(id));
  const isLoading = ref(false);
  const error = ref<ErrorInterface | null>(null);

  async function fetchStory() {
    try {
      isLoading.value = true;
      error.value = null;
      await store.fetchStory(id);
    } catch (e) {
      error.value = new ApplicationError("Échec de récupération de la story", e);
      toast.error(t("errors.fetchFailed"));
    } finally {
      isLoading.value = false;
    }
  }

  async function updateStory(data: UpdateStoryDTO) {
    try {
      isLoading.value = true;
      error.value = null;
      await store.updateStory({ ...data, id });
      toast.success(t("story.updateSuccess"));
    } catch (e) {
      error.value = new ApplicationError("Échec de mise à jour de la story", e);
      toast.error(t("errors.updateFailed"));
    } finally {
      isLoading.value = false;
    }
  }

  // Hooks de cycle de vie
  onMounted(() => {
    fetchStory();
  });

  return {
    story,
    isLoading: readonly(isLoading),
    error: readonly(error),
    updateStory
  };
}

// Utilisation dans un composant
<script setup lang="ts">
const props = defineProps<{ id: string }>();
const { story, isLoading, error, updateStory } = useStory(props.id);
</script>
```

### 2. Pattern Store (Pinia) 📦

Organisation de l'état global avec Pinia.

```typescript
// storyStore.ts
export interface StoryState {
  stories: Map<string, StoryDTO>;
  currentStory: StoryDTO | null;
  isLoading: boolean;
  error: ErrorInterface | null;
}

export const useStoryStore = defineStore('story', {
  state: (): StoryState => ({
    stories: new Map(),
    currentStory: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getStoryById: (state) => {
      return (id: string) => state.stories.get(id);
    },
    
    sortedStories: (state) => {
      return Array.from(state.stories.values())
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
  },

  actions: {
    async fetchStory(id: string) {
      const useCase = new FetchStoryUseCase(this.storyService);
      
      try {
        this.isLoading = true;
        this.error = null;
        
        const result = await useCase.execute(id);
        if (result.isSuccess) {
          this.stories.set(id, result.value);
        } else {
          this.error = result.error;
        }
      } catch (error) {
        this.error = new StoreError("Échec de récupération de la story", error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
```

### 3. Pattern Composant de Présentation 🖼️

Séparation des composants en présentation pure et conteneur.

```typescript
// StoryCard.vue (Composant de présentation)
<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  status: string;
  points: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();

const statusColor = computed(() => {
  switch (props.status) {
    case "TODO": return "bg-gray-100";
    case "IN_PROGRESS": return "bg-blue-100";
    case "DONE": return "bg-green-100";
    default: return "bg-gray-100";
  }
});
</script>

<template>
  <div :class="['story-card', statusColor]">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="actions">
      <button @click="emit('edit')">Modifier</button>
      <button @click="emit('delete')">Supprimer</button>
    </div>
  </div>
</template>

// StoryCardContainer.vue (Composant conteneur)
<script setup lang="ts">
const props = defineProps<{
  storyId: string;
}>();

const { story, updateStory, deleteStory } = useStory(props.storyId);
const { isOpen, open, close } = useModal();

async function handleEdit() {
  open();
}

async function handleDelete() {
  if (await confirm("Êtes-vous sûr ?")) {
    await deleteStory();
  }
}
</script>

<template>
  <StoryCard
    v-if="story"
    v-bind="story"
    @edit="handleEdit"
    @delete="handleDelete"
  />
  <StoryEditModal
    v-model:open="isOpen"
    :story="story"
    @save="updateStory"
  />
</template>
```

### 4. Pattern Formulaire 📝

Gestion des formulaires avec validation et état.

```typescript
// useForm.ts
export function useForm<T extends object>(initialData: T) {
  const form = reactive({ ...initialData });
  const errors = reactive<Record<keyof T, string>>({} as Record<keyof T, string>);
  const isDirty = ref(false);
  const isSubmitting = ref(false);

  watch(
    form,
    () => {
      isDirty.value = true;
    },
    { deep: true }
  );

  function reset() {
    Object.assign(form, initialData);
    Object.keys(errors).forEach(key => delete errors[key as keyof T]);
    isDirty.value = false;
  }

  async function validate(): Promise<boolean> {
    // Implémentation de la validation
    return true;
  }

  async function handleSubmit(
    submitFn: (data: T) => Promise<void>
  ) {
    try {
      isSubmitting.value = true;
      if (await validate()) {
        await submitFn(form);
        reset();
      }
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    form,
    errors,
    isDirty: readonly(isDirty),
    isSubmitting: readonly(isSubmitting),
    reset,
    handleSubmit
  };
}

// StoryForm.vue
<script setup lang="ts">
const props = defineProps<{
  initialData?: Partial<CreateStoryDTO>;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateStoryDTO): void;
}>();

const {
  form,
  errors,
  isDirty,
  isSubmitting,
  handleSubmit
} = useForm<CreateStoryDTO>({
  title: props.initialData?.title ?? "",
  description: props.initialData?.description ?? "",
  points: props.initialData?.points ?? 0
});

const onSubmit = handleSubmit(async (data) => {
  emit("submit", data);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <BaseInput
      v-model="form.title"
      :error="errors.title"
      label="Titre"
      required
    />
    <BaseTextarea
      v-model="form.description"
      :error="errors.description"
      label="Description"
    />
    <BaseNumberInput
      v-model="form.points"
      :error="errors.points"
      label="Points"
    />
    <BaseButton
      type="submit"
      :disabled="!isDirty || isSubmitting"
      :loading="isSubmitting"
    >
      Enregistrer
    </BaseButton>
  </form>
</template>
```

### 5. Pattern Guard de Route 🛡️

Protection et contrôle d'accès aux routes.

```typescript
// authGuard.ts
export interface GuardInterface {
  canActivate(to: RouteLocationNormalized): Promise<boolean | RouteLocationRaw>;
}

export class AuthGuard implements GuardInterface {
  constructor(
    private readonly authService: AuthServiceInterface,
    private readonly logger: LoggerInterface
  ) {}

  async canActivate(
    to: RouteLocationNormalized
  ): Promise<boolean | RouteLocationRaw> {
    try {
      const isAuthenticated = await this.authService.isAuthenticated();
      
      if (!isAuthenticated) {
        this.logger.warn("Tentative d'accès non autorisé", {
          path: to.fullPath
        });
        
        return {
          path: "/login",
          query: { redirect: to.fullPath }
        };
      }

      // Vérification des permissions
      if (to.meta.requiresPermission) {
        const hasPermission = await this.authService
          .hasPermission(to.meta.requiresPermission);

        if (!hasPermission) {
          return { path: "/non-autorise" };
        }
      }

      return true;
    } catch (error) {
      this.logger.error("Erreur du guard d'authentification", { error });
      return { path: "/erreur" };
    }
  }
}

// Configuration du router
export function setupRouteGuards(router: Router) {
  const authGuard = new AuthGuard(
    container.get(AuthServiceInterface),
    container.get(LoggerInterface)
  );

  router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      const result = await authGuard.canActivate(to);
      if (result === true) {
        next();
      } else {
        next(result);
      }
    } else {
      next();
    }
  });
}
```

## Bonnes Pratiques 🎯

### 1. Séparation des Responsabilités

```typescript
// ✅ Bon : Composant de présentation pure
export const StoryCard = defineComponent({
  props: {
    title: String,
    description: String
  },
  emits: ["edit", "delete"],
  setup(props, { emit }) {
    // Uniquement la logique de présentation
  }
});

// ✅ Bon : Composant conteneur
export const StoryCardContainer = defineComponent({
  setup() {
    // Logique métier et état
    const store = useStoryStore();
    return () => h(StoryCard, { ...store.story });
  }
});
```

### 2. Gestion de l'État

```typescript
// ✅ Bon : État local dans les composables
export function useState<T>(initial: T) {
  const state = ref(initial);
  const setState = (value: T) => {
    state.value = value;
  };
  return [readonly(state), setState] as const;
}

// ✅ Bon : État global dans le store
export const useStore = defineStore("main", {
  state: () => ({
    // État global uniquement
  })
});
```

### 3. Performance

```typescript
// ✅ Bon : Optimisation des rendus
export const StoryList = defineComponent({
  setup() {
    const stories = computed(() => store.sortedStories);
    
    return () => stories.value.map(story =>
      h(StoryCard, {
        key: story.id,
        ...story
      })
    );
  }
});
```

## Anti-Patterns à Éviter ⚠️

### 1. Logique Métier dans les Composants

```typescript
// ❌ Mauvais : Logique métier dans le composant
export const StoryCard = defineComponent({
  methods: {
    calculatePriority() {
      // Logique métier ici
    }
  }
});

// ✅ Bon : Logique métier dans le domaine
export const StoryCard = defineComponent({
  setup() {
    const { story } = useStory();
    const priority = computed(() => story.value.priority);
  }
});
```

### 2. État Global Excessif

```typescript
// ❌ Mauvais : Trop d'état global
export const useStore = defineStore("main", {
  state: () => ({
    // État qui devrait être local
    currentScrollPosition: 0,
    isModalOpen: false
  })
});

// ✅ Bon : État local approprié
export function useModal() {
  const isOpen = ref(false);
  return {
    isOpen: readonly(isOpen),
    open: () => isOpen.value = true,
    close: () => isOpen.value = false
  };
}
```

### 3. Props Drilling

```typescript
// ❌ Mauvais : Props drilling
<template>
  <div>
    <Header :user="user" />
    <Sidebar :user="user" />
    <Main :user="user">
      <Content :user="user" />
    </Main>
  </div>
</template>

// ✅ Bon : Utilisation de provide/inject
export function useUser() {
  const user = inject(UserSymbol);
  if (!user) throw new Error("Contexte utilisateur non trouvé");
  return user;
}
```

## Directives de la Couche Présentation 📋

1. Séparer clairement les composants de présentation des conteneurs
2. Utiliser les composables pour la réutilisation de la logique
3. Gérer l'état de manière appropriée (local vs global)
4. Optimiser les performances de rendu
5. Maintenir une structure de composants cohérente
6. Implémenter une gestion d'erreurs utilisateur robuste
