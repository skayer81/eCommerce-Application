import { create } from 'zustand';

interface CatalogState {
  attributes: Record<string, string>;
  categoryId: string;
  isAttributesEmpty: () => boolean;
  parentId: string;
  resetAllAttributes: () => void;
  resetAttribute: (key: string) => void;
  setAttributes: (newAttributes: Record<string, string>) => void;
  setCategory: (newCategory: { categoryId: string; parentId: string }) => void;
  setSortValue: (newSortValue: string) => void;
  sortValue: string;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
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
  resetAllAttributes: () =>
    set({
      attributes: {},
    }),
  isAttributesEmpty: () => {
    const state = get();
    const attributes = state.attributes;
    return (
      Object.keys(attributes).length === 0 ||
      Object.values(attributes).every((value) => value === '')
    );
  },
}));
