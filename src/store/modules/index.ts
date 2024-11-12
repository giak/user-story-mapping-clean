import { initializeAppStore } from './app';
import { initializeAuthStore } from './auth';
import { initializeUiStore } from './ui';

/**
 * Initialize all store modules
 */
export function initializeStoreModules(): void {
  initializeAppStore();
  initializeAuthStore();
  initializeUiStore();
}
