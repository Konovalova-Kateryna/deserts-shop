import { prisma } from "@/prisma/prisma-client";
import { nanoid } from "nanoid";

export const createCart = async (token: string) => {
  let userCart = await prisma.cart.findFirst({ where: { token } });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        id: nanoid(),
        token,
      },
    });
  }

  return userCart;
};
