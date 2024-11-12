import router from "@/infrastructure/router";
import { initializeStores } from "@/store";
import 'reflect-metadata'; // Nécessaire pour inversify
import type { App as VueApp } from "vue";
import { initializeHead } from "./plugins/head";
import { initializeI18n } from "./plugins/i18n";
import { initializePrimeVue } from "./plugins/primeVue";

/**
 * Initialize and configure the Vue application
 * @param app Vue application instance
 */
export function initializeApplication(app: VueApp): void {
  // Initialize plugins
  app.use(router);
  initializePrimeVue(app);
  initializeI18n(app);
  initializeHead(app);

  // Initialize global store
  initializeStores(app);
}
