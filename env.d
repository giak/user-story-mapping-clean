/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

// Interface pour les variables d'environnement
interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string; // Version de l'application
  readonly BASE_URL: string; // URL de base pour l'application
  readonly VITE_APP_TITLE: string; // Titre de l'application
  readonly VITE_API_URL?: string; // URL de l'API (optionnelle)
  readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'; // Niveau de log
  readonly VITE_MAX_LOGS: string; // Nombre maximum de logs à conserver
  readonly NODE_ENV: string; // Environnement d'exécution (development, production, test)
}

// Interface pour l'objet ImportMeta
interface ImportMeta {
  readonly env: ImportMetaEnv; // Propriété pour accéder aux variables d'environnement
}

// Déclaration de module pour les fichiers .vue
declare module "*.vue" {
  import type { DefineComponent } from "vue"; // Importation du type DefineComponent de Vue
  const component: DefineComponent<{}, {}, any>; // Déclaration d'un composant Vue
  export default component; // Exportation par défaut du composant
}
