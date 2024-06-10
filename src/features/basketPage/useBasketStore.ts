import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BasketStore {
  quantityItemInBasket: number;
  updateQuantity: (a: number) => void;
}
export const useBasketStore = create<BasketStore>()(
  persist(
    (set) => ({
      quantityItemInBasket: 0,
      updateQuantity: (quantity: number) => {
        set((state) => ({
          ...state,
          quantityItemInBasket: quantity,
        }));
      },
    }),
    {
      name: 'basket',
    },
  ),
);
