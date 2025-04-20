import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "./get-user-session";
import { nanoid } from "nanoid";

export const createFavorites = async () => {
  const userSession = await getUserSession();
  if (!userSession) {
    throw new Error("User not found");
  }

  let favorites = await prisma.favorite.findFirst({
    where: { userId: userSession.user.id },
  });

  if (!favorites) {
    favorites = await prisma.favorite.create({
      data: {
        id: nanoid(),
        userId: userSession.user.id,
        token: userSession.user.id,
      },
    });
  }

  return favorites;
};
