import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

export interface BasketStore {
  addBasketIDInStore: (id: string) => void;
  basketError: boolean;
  basketId: string;

  basketVersion: number;
  setBasketError: (errorState: boolean) => void;

  updateCurrentVersion: (id: number) => void;
}
export const useBasketStore = create<BasketStore>((set) => ({
  basketId: '',
  basketVersion: 1,
  basketError: false,

  addBasketIDInStore: (id: string) => {
    set((state) => ({
      ...state,
      basketId: id,
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

export const { addBasketIDInStore, updateCurrentVersion } = useBasketStore.getState();
