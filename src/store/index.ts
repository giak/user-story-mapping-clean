/**
 * Configuration et initialisation du store global Pinia
 * Implémente une gestion d'état centralisée avec persistance
 *
 * @module store/index
 */

import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { initializeStoreModules } from "./modules"
import type { App } from "vue"

/**
 * Instance Pinia singleton pour la gestion d'état globale
 * Configurée avec le plugin de persistance pour sauvegarder l'état
 */
const pinia = createPinia()

// Configuration du plugin de persistance pour la sauvegarde sécurisée de l'état
pinia.use(piniaPluginPersistedstate)

/**
 * Initialise le store global et ses modules
 * Configure la persistance et enregistre les modules métier
 *
 * @param {App} app - Instance de l'application Vue.js
 * @throws {Error} Si l'initialisation d'un module échoue
 *
 * @example
 * ```ts
 * const app = createApp(App)
 * initializeStores(app)
 * ```
 */
export function initializeStores(app: App): void {
  try {
    // Enregistrement de l'instance Pinia
    app.use(pinia)

    // Initialisation des modules du store
    initializeStoreModules()
  } catch (error) {
    // Log de l'erreur pour le debugging
    console.error("[Store] Initialization failed:", error)
    throw error
  }
}

// Export de l'instance Pinia pour une utilisation dans les composants
export default pinia
