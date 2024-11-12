import Nora from "@primevue/themes/nora";
import type { PrimeVueConfiguration } from "primevue/config";

export const PRIME_VUE_CONFIG: PrimeVueConfiguration = {
  theme: {
    preset: Nora,
    options: {},
  },
  ripple: true,
} as const; 