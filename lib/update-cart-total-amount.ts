import { prisma } from "@/prisma/prisma-client";
import { calcCartItemPrice } from "./calc-cart-item-price";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: { product: true },
      },
    },
  });

  if (!userCart) return null;

  const totalAmount =
    userCart?.items.reduce((acc, item) => {
      return acc + calcCartItemPrice(item);
    }, 0) || 0;

  return await prisma.cart.update({
    where: { id: userCart.id },
    data: { totalAmount },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: { product: true },
      },
    },
  });
};
