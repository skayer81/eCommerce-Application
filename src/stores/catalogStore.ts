import { create } from 'zustand';

interface CatalogState {
  attributes: Record<string, string>;
  categoryId: string;
  parentId: string;
  resetAttribute: (key: string) => void;
  setAttributes: (newAttributes: Record<string, string>) => void;
  setCategory: (newCategory: { categoryId: string; parentId: string }) => void;
  setSortValue: (newSortValue: string) => void;
  sortValue: string;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  categoryId: '',
  parentId: '',
  sortValue: '',
  attributes: {},
  setCategory: (newCategory) =>
    set({
      categoryId: newCategory.categoryId,
      parentId: newCategory.parentId,
    }),
  setSortValue: (newSortValue) =>
    set({
      sortValue: newSortValue,
    }),
  setAttributes: (newAttributes) =>
    set({
      attributes: newAttributes,
    }),

  resetAttribute: (key) =>
    set((state) => ({
      attributes: {
        ...state.attributes,
        [key]: '',
      },
    })),
}));
