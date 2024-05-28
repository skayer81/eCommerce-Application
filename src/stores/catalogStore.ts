import { create } from 'zustand';

interface CatalogState {
  categoryId: string;
  setCategoryId: (newCategoryId: string) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  categoryId: '',
  setCategoryId: (newCategoryId: string) => set({ categoryId: newCategoryId }),
}));
