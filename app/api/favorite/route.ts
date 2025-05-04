import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next/auth";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/lib/get-user-session";
import { nanoid } from "nanoid";
import { createFavorites } from "@/lib/create-favorites";
import { FavoriteItemDTO } from "@/services/dto/favorite.dto";

// get all favorite products
export async function GET() {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json("Помилка авторизації", { status: 401 });
    }
    const favoriteProducts = await prisma.favorite.findFirst({
      where: {
        userId: userSession.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(favoriteProducts);
  } catch (error) {
    console.log("[FAVORITE_GET] Server Error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// toggle product to favorite

export async function POST(req: NextRequest) {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json("Помилка авторизації", { status: 401 });
    }

    const data = (await req.json()) as FavoriteItemDTO;

    if (!data) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const userFavorites = await createFavorites();

    const findFavoriteItem = await prisma.favoriteItem.findFirst({
      where: {
        favoriteId: userFavorites.id,
        productId: data.productId,
      },
    });

    if (findFavoriteItem) {
      await prisma.favoriteItem.delete({
        where: {
          id: findFavoriteItem?.id,
          productId: data.productId,
        },
      });
      return NextResponse.json(
        { message: "Product deleted from favorite" },
        { status: 200 }
      );
    }

    const newFavoriteProduct = await prisma.favoriteItem.create({
      data: {
        id: nanoid(),
        favoriteId: userFavorites.id,
        productId: data.productId,
      },
    });
    console.log("str 78 newFavoriteProduct", newFavoriteProduct);

    return NextResponse.json(
      { message: "Product added to favorite" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("[FAVORITE_POST] Server Error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
