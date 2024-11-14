import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isInitialized: false,
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  }),

  actions: {
    setInitialized(value: boolean) {
      this.isInitialized = value;
    },
  },
});

export function initializeAppStore(): void {
  const store = useAppStore();
  // Initialize app store specific logic
  store.setInitialized(true);
}
