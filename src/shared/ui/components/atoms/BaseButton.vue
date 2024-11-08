<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  type: "button",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <button
    :type="type"
    :class="[
      `btn btn-${variant}`,
      `btn-${size}`,
      { btn-disabled: disabled || loading }
    ]"
    :disabled="disabled || loading"
    @click="emit(click, $event)"
  >
    <span v-if="loading" class="btn-loader" />
    <slot v-else />
  </button>
</template>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

.btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.btn-md {
  @apply px-4 py-2 text-base;
}

.btn-lg {
  @apply px-6 py-3 text-lg;
}

.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn-loader {
  @apply animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full;
}
</style>
