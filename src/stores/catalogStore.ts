import { create } from 'zustand';

interface CatalogState {
  categoryId: string;
  parentId: string;
  setCategory: (newCategory: { categoryId: string; parentId: string }) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  categoryId: '',
  parentId: '',
  setCategory: (newCategory) =>
    set({
      categoryId: newCategory.categoryId,
      parentId: newCategory.parentId,
    }),
}));
