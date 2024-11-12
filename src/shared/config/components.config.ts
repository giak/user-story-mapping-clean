import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Popover from "primevue/popover";
import Select from "primevue/select";
import Toast from "primevue/toast";

/**
 * Interface for PrimeVue components configuration
 */
interface PrimeVueComponentsInterface {
  Toast: typeof Toast;
  Button: typeof Button;
  Select: typeof Select;
  InputText: typeof InputText;
  Popover: typeof Popover;
  Menu: typeof Menu;
}

/**
 * Global PrimeVue components configuration
 */
export const PRIME_VUE_COMPONENTS: PrimeVueComponentsInterface = {
  Toast,
  Button,
  Select,
  InputText,
  Popover,
  Menu,
} as const; 