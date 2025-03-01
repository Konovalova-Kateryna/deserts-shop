import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { create } from "zustand";

export interface IProduct {
  id: string;
  name: string;
  titleUa: string;
  description: string;
  price: number;
  imageUrl: string;
  trend: boolean;
  categoryId: string;
  createdAt: string;
  updateAt: string;
}

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  fetchCartItems: () => Promise<void>; //Отримання товарів з кошика
  updateItemQuantity: (id: string, quantity: number) => Promise<void>; //Запит на оновлення кількості товарів
  addCartItem: (value: CreateCartItemValues) => Promise<void>; // Запит на додавання товару в кошик
  removeCartItem: (id: string) => Promise<void>; //Запит на видалення товару із кошика
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.getCart();

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: string, quantity: number) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.updateItemQuantity(id, quantity);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: string) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.removeItem(id);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.addCartItem(values);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
