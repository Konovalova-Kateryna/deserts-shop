import { CartStateItem } from "@/lib/get-cart-details";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { useCartStore } from "@/store";
import React from "react";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  addCartItem: (values: CreateCartItemValues) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cartState;
};
