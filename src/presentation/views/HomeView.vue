<script setup lang="ts">
// Composables
import { useHead } from "@vueuse/head"
import { ref } from vue

// Store the env variable in a ref to use in template
const appTitle = ref(import.meta.env.VITE_APP_TITLE)

useHead({
  title: appTitle.value,
  meta: [
    {
      name: "description",
      content: "Application Vue.js avec Clean Architecture"
    }
  ]
})
</script>

<template>
  <main class="container py-8">
    <h1 class="mb-8 text-4xl font-bold text-gray-900">
      {{ appTitle }}
    </h1>
    <p class="text-lg text-gray-600">
      Bienvenue sur votre application Vue.js avec Clean Architecture
    </p>
  </main>
</template>

