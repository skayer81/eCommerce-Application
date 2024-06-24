import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStore {
  isLogin: boolean;
  loginUserInStore: (id: string) => void;
  logoutUserInStore: () => void;
  userId: string;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: '',
      isLogin: false,

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

export const { logoutUserInStore } = useUserStore.getState();
