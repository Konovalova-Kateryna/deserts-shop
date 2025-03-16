import { prisma } from "@/prisma/prisma-client";

interface Favorite {
  userId: string;
  productId: Products[];
}

export const getFavorites = async (userId) => {
  return await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });
};

export const addFavorite = async ({ user, product }) => {
  await prisma.favorite.create({
    data: {
      userId: user.id,
      productId: product.id,
    },
  });
};

export const removeFavorite = async ({ user, product }) => {
  await prisma.favorite.delete({
    where: {
      userId_productId: {
        userId: user.id,
        productId: product.id,
      },
    },
  });
};
