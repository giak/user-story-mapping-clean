import pinia from "@/initialization/plugins/store";
import type { App as VueApp } from "vue";

/**
 * Initialize Pinia store and load initial data
 * @param app Vue application instance
 */
export function initializeStores(app: VueApp): void {
  app.use(pinia);
  // Init data stores
}
