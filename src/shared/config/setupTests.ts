import { vi } from 'vitest';

// Mock global de PrimeVue useToast
vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: vi.fn(),
    // Ajoutez d'autres méthodes si nécessaire
  }),
}));

// Mock global des autres dépendances
vi.mock('@/composables/useErrorBoundary', () => ({
  useErrorBoundary: vi.fn(() => ({
    error: null,
    resetError: vi.fn(),
  })),
}));

vi.mock('@/stores/columnStore', () => ({
  useColumnStore: vi.fn(() => ({
    columns: [],
    getAllColumnsGetter: [],
    moveMainColumnAction: vi.fn(),
    addColumnAction: vi.fn(),
    addItemAction: vi.fn(),
    // Ajoutez d'autres propriétés ou méthodes selon les besoins
  })),
}));
