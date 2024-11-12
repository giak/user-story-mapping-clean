/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
interface ImportMetaEnv {
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL?: string;
  readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  readonly VITE_MAX_LOGS: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>
  export default component
}
