import { create } from 'zustand';

export interface BasketStore {
  addBasketIDInStore: (id: string) => void;
  basketError: boolean;
  basketId: string;
  basketVersion: number;
  numbOfItems: number;

  setBasketError: (errorState: boolean) => void;
  updateCurrentVersion: (id: number) => void;
  updateNumbOfItems: (id: number) => void;
}
export const useBasketStore = create<BasketStore>((set) => ({
  basketId: '',
  basketVersion: 1,
  basketError: false,
  numbOfItems: 0,

  addBasketIDInStore: (id: string) => {
    set((state) => ({
      ...state,
      basketId: id,
    }));
  },

  updateNumbOfItems: (numbOfItems: number) => {
    set((state) => ({
      ...state,
      numbOfItems: numbOfItems,
    }));
  },

  updateCurrentVersion: (basketVersion: number) => {
    set((state) => ({
      ...state,
      basketVersion: basketVersion,
    }));
  },

  setBasketError: (errorState: boolean) => {
    set((state) => ({
      ...state,
      basketError: errorState,
    }));
  },
}));

export const { addBasketIDInStore, updateCurrentVersion, updateNumbOfItems } =
  useBasketStore.getState();
