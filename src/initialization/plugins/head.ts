import { createHead } from '@vueuse/head';
import type { App as VueApp } from "vue";

/**
 * Configuration de @vueuse/head pour la gestion des métadonnées HTML
 * @param app Vue application instance
 */
export function initializeHead(app: VueApp): void {
  const head = createHead();
  app.use(head);
}
