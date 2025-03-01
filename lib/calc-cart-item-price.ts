import { CartItemDTO } from "@/services/dto/cart.dto";

export const calcCartItemPrice = (item: CartItemDTO): number => {
  return item.product.price * item.quantity;
};
