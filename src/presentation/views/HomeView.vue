<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { ref } from "vue";

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
    <p class="mb-8 text-lg text-primary-800">
      Application Vue.js avec Clean Architecture
    </p>
  </main>
</template>
