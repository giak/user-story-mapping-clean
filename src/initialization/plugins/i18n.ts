import { createI18n } from 'vue-i18n';
import type { App as VueApp } from "vue";

/**
 * Configuration de vue-i18n pour l'internationalisation
 * @param app Vue application instance
 */
export function initializeI18n(app: VueApp): void {
  const i18n = createI18n({
    legacy: false, // Utilisation de la Composition API
    locale: 'fr', // Locale par défaut
    fallbackLocale: 'en',
    messages: {
      // Les messages seront chargés via @intlify/unplugin-vue-i18n
    }
  });

  app.use(i18n);
}
