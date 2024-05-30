import { create } from 'zustand';

interface CatalogState {
  categoryId: string;
  parentId: string;
  setCategory: (newCategory: { categoryId: string; parentId: string }) => void;
  setSortValue: (newSortValue: string) => void;
  sortValue: string;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  categoryId: '',
  parentId: '',
  sortValue: '',
  setCategory: (newCategory) =>
    set({
      categoryId: newCategory.categoryId,
      parentId: newCategory.parentId,
    }),
  setSortValue: (newSortValue) =>
    set({
      sortValue: newSortValue,
    }),
}));
