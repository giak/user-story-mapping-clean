import { PRIME_VUE_COMPONENTS } from "@/shared/config/components.config";
import { PRIME_VUE_CONFIG } from "@/shared/config/primeVue.config";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import type { App as VueApp } from "vue";

/**
 * Register PrimeVue plugins and components
 * @param app Vue application instance
 */
export function initializePrimeVue(app: VueApp): void {
  // Register core plugins
  app.use(PrimeVue, PRIME_VUE_CONFIG);
  app.use(ToastService);
  app.use(ConfirmationService);

  // Register components
  Object.entries(PRIME_VUE_COMPONENTS).forEach(([name, component]) => {
    app.component(name, component);
  });

  // Register directives
  app.directive("tooltip", Tooltip);
}

