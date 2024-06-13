import { create } from 'zustand';

import {
  anonymFlowAuth,
  createAnonymBasket,
  existingFlowAuth,
  getActiveBasket,
} from '../api/clientService';
import { PROJECT_KEY } from '../config/clientConfig.ts';
import getCookie from '../utils/helpers/cookies.ts';

const createNewBasket = (): void => {
  const token = getCookie(PROJECT_KEY);
  if (token !== null) {
    const accessToken = 'Bearer ' + token;
    const root = existingFlowAuth(accessToken);
    getActiveBasket(root)
      .then((data) => {
        console.log('activebasket=', data.body.id);
        addBasketIDInStore(data.body.id);
        updateCurrentVersion(data.body.version);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const root = anonymFlowAuth();
    createAnonymBasket(root)
      .then((data) => {
        console.log('createbasket=', data.body.id);
        addBasketIDInStore(data.body.id);
        updateCurrentVersion(data.body.version);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export interface BasketStore {
  addBasketIDInStore: (id: string) => void;
  basketError: boolean;
  basketId: string;
  basketVersion: number;
  createBasket: () => void;
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

  createBasket: createNewBasket,

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

export const { addBasketIDInStore, createBasket, updateCurrentVersion } = useBasketStore.getState();
