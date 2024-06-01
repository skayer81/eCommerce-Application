import { create } from 'zustand';

interface CatalogState {
  attributes: Record<string, string>;
  categoryId: string;
  isAttributesEmpty: () => boolean;
  parentId: string;
  resetAllAttributes: () => void;
  resetAttribute: (key: string) => void;
  searchValue: string;
  setAttributes: (newAttributes: Record<string, string>) => void;
  setCategory: (newCategory: { categoryId: string; parentId: string }) => void;
  setSearchValue: (newSearchValue: string) => void;
  setSortValue: (newSortValue: string) => void;
  sortValue: string;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  categoryId: '',
  parentId: '',
  sortValue: '',
  searchValue: '',
  attributes: {},
  setCategory: (newCategory) =>
    set({
      categoryId: newCategory.categoryId,
      parentId: newCategory.parentId,
      searchValue: '',
    }),
  setSortValue: (newSortValue) =>
    set({
      sortValue: newSortValue,
    }),

  setSearchValue: (newSearchValue) =>
    set({
      searchValue: newSearchValue,
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
