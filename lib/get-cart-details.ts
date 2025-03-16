import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemPrice } from "./calc-cart-item-price";

export interface CartStateItem {
  id: string;
  quantity: number;
  name: string;
  imageUrl: string;
  titleUa: string;
  price: number;
  disabled?: boolean;
}

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  if (!data || !data.items) {
    console.warn("getCartDetails data is empty", data);
    return { items: [], totalAmount: 0 };
  }

  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.product?.name,
    titleUa: item.product?.titleUa,
    imageUrl: item.product?.imageUrl,
    price: calcCartItemPrice(item),
    disabled: false,
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount || 0,
  };
};
