import { create } from 'zustand';

type userStore = {
  isLogin: boolean;
  userId: string;
};

export const useUserStore = create<userStore>((set) => ({
  userId: '',
  isLogin: false,

  loginUser: (id: string) => {
    set((state) => ({
      ...state,
      userId: id,
      isLogin: true,
    }));
  },

  logoutUser: () => {
    set((state) => ({
      ...state,
      userId: '',
      isLogin: false,
    }));
  },
}));
