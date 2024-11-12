import 'reflect-metadata'; // Nécessaire pour inversify
import router from "@/infrastructure/router";
import type { App as VueApp } from "vue";
import { initializePrimeVue } from "./plugins/primeVue";
import { initializeStores } from "@/shared/store";
import { initializeI18n } from "./plugins/i18n";
import { initializeHead } from "./plugins/head";

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

  // Initialize store data
  initializeStores(app);
}
