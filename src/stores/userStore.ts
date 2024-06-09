import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStore {
  addBasketIDInStore: (id: string) => void;
  basketId: string;
  basketVersion: number;
  isLogin: boolean;
  loginUserInStore: (id: string) => void;
  logoutUserInStore: () => void;
  updateCurrentVersion: (id: number) => void;
  userId: string;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      basketId: '',
      basketVersion: 1,
      userId: '',
      isLogin: false,

      addBasketIDInStore: (id: string) => {
        set((state) => ({
          ...state,
          basketId: id,
        }));
      },

      loginUserInStore: (id: string) => {
        set((state) => ({
          ...state,
          userId: id,
          isLogin: true,
        }));
      },

      logoutUserInStore: () => {
        set((state) => ({
          ...state,
          userId: '',
          isLogin: false,
        }));
      },

      updateCurrentVersion: (basketVersion: number) => {
        set((state) => ({
          ...state,
          basketVersion: basketVersion,
        }));
      },
    }),
    {
      name: 'green-shop',
    },
  ),
);
