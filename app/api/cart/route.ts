import { createCart } from "@/lib/create-cart";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { nanoid } from "nanoid";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Cart not found", totalAmount: 0, items: [] },
        { status: 404 }
      );
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server Errore", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await createCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: data.productItemId,
      },
    });

    //   Якщо вибраний товар вже є в кошику, то збільшуємо його кількість
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Якщо вибраного товару не було в кошику, то додаємо його
      await prisma.cartItem.create({
        data: {
          id: nanoid(),
          cartId: userCart.id,
          productId: data.productItemId,
          quantity: 1,
        },
      });
    }
    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set("cartToken", token);

    return resp;
  } catch (error) {
    console.error("[CART_POST] Server Errore", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
