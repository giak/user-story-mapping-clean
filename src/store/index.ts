import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { initializeStoreModules } from './modules';
import type { App } from 'vue';

// Create pinia instance
const pinia = createPinia();

// Register plugins
pinia.use(piniaPluginPersistedstate);

/**
 * Initialize global store and its modules
 * @param app Vue application instance
 */
export function initializeStores(app: App): void {
  // Register pinia instance
  app.use(pinia);

  // Initialize store modules
  initializeStoreModules();
}

export default pinia;
