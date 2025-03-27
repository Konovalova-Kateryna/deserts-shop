"use server";

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  console.log(data);

  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("cartToken not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }
    const order = await prisma.order.create({
      data: {
        id: nanoid(),
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        paymentId: "123",
        items: JSON.stringify(userCart.items),
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment || "",
      },
    });
    await prisma.cart.update({
      where: {
        token: cartToken,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    console.log(order);
  } catch (error) {
    console.error(error);
  }

  // Створити посилання на оплату
  return "https://paypartslimit.privatbank.ua/pp-limit/";
}
