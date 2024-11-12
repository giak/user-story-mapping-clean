import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    token: null,
  }),

  persist: {
    paths: ['token'],
  },

  actions: {
    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    setToken(token: string | null) {
      this.token = token;
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  },
});

export function initializeAuthStore(): void {
  const store = useAuthStore();
  // Vérifier le token stocké et initialiser l'état d'authentification si nécessaire
  if (store.token) {
    store.isAuthenticated = true;
  }
}
