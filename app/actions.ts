"use server";

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { mailOptions } from "@/lib/sendEmail";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SERVICE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_DEBUG,
  SMTP_FROM,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  service: SMTP_SERVICE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  debug: SMTP_DEBUG,
});

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
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
        items: userCart.items,
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

    // Send email
    await transporter.sendMail(
      mailOptions({
        sender: SMTP_FROM || "",
        email: data.email,
        firstName: data.firstName,
        orderId: order.id,
        orderAddress: data.address,
        totalAmount: order.totalAmount,
        items: order.items,
      }),
      (error, info) => {
        if (error) {
          console.log("Email error: ", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );

    cookieStore.delete("cartToken");
  } catch (error) {
    console.log("[CREATE_ORDER] Server Error", error);
    console.error(error);
  }
  // Створити посилання на оплату
  return "/";
}
