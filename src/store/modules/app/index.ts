import { defineStore } from 'pinia';
import { EnvConfig } from '@/shared/config/env.config';

export const useAppStore = defineStore('app', {
  state: () => ({
    isInitialized: false,
    version: import.meta.env['VITE_APP_VERSION'] || '1.0.0',
  }),

  actions: {
    setInitialized(value: boolean) {
      this.isInitialized = value;
    },
  },
});

export function initializeAppStore(): void {
  const store = useAppStore();
  store.setInitialized(true);
}
