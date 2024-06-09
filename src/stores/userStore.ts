import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStore {
  addBasketIDInStore: (id: string) => void;
  busketId: string;
  isLogin: boolean;
  loginUserInStore: (id: string) => void;
  logoutUserInStore: () => void;
  userId: string;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      busketId: '',
      userId: '',
      isLogin: false,

      addBasketIDInStore: (id: string) => {
        set((state) => ({
          ...state,
          busketId: id,
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
    }),
    {
      name: 'green-shop',
    },
  ),
);
