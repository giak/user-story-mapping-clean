import { defineStore } from 'pinia';

interface UiState {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  loading: boolean;
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    theme: 'light',
    sidebarCollapsed: false,
    loading: false,
  }),

  persist: {
    paths: ['theme', 'sidebarCollapsed'],
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    setLoading(value: boolean) {
      this.loading = value;
    },
  },
});

export function initializeUiStore(): void {
  const store = useUiStore();
  // Appliquer le thème stocké
  if (store.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}
