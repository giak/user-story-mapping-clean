<script setup lang="ts">
import { onMounted } from "vue"
import { useStoryStore } from "../../contexts/story/presentation/stores/storyStore"
import StoryCard from "../../contexts/story/presentation/components/StoryCard.vue"
import type { StoryDTO } from "../../contexts/story/application/dtos/StoryDTO"

const storyStore = useStoryStore()

onMounted(async () => {
  await storyStore.loadStories()
})

const handleCreateStory = async (data: Omit<StoryDTO, "id">) => {
  await storyStore.createStory(data)
}

const handleDeleteStory = (id: string) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette story ?")) {
    storyStore.deleteStory(id)
  }
}
</script>

<template>
  <div class="stories-view">
    <div class="header">
      <h1 class="title">Stories</h1>
      <button @click="handleCreateStory" class="btn btn-primary">
        Nouvelle Story
      </button>
    </div>

    <div v-if="storyStore.error" class="error-message">
      {{ storyStore.error }}
    </div>

    <div v-if="storyStore.loading" class="loading">
      Chargement...
    </div>

    <div v-else-if="storyStore.stories.length === 0" class="empty-state">
      Aucune story pour le moment.
    </div>

    <div v-else class="stories-grid">
      <StoryCard
        v-for="story in storyStore.stories"
        :key="story.id"
        :story="story"
        @delete="handleDeleteStory(story.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.stories-view {
  @apply p-6;
}

.header {
  @apply flex justify-between items-center mb-6;
}

.title {
  @apply text-2xl font-bold text-gray-900;
}

.error-message {
  @apply bg-red-50 text-red-700 p-4 rounded-md mb-4;
}

.loading {
  @apply text-center text-gray-500 py-8;
}

.empty-state {
  @apply text-center text-gray-500 py-8;
}

.stories-grid {
  @apply grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3;
}
</style>
