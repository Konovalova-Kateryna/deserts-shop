"use server";

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import {
  mailOptionsForOrder,
  mailOptionsForVerificationCode,
} from "@/lib/sendEmail";
import { getUserSession } from "@/lib/get-user-session";
import { hashSync } from "bcrypt";

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
      mailOptionsForOrder({
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

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }
    const findUser = await prisma.user.findFirst({
      where: {
        id: currentUser.user.id,
      },
    });
    await prisma.user.update({
      where: {
        id: currentUser.user.id,
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.error("[UPDATE_USER_INFO] Server Error", error);
    throw new Error("Server error");
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      throw new Error("Користувач з таким email вже існує");
    }
    const createdUser = await prisma.user.create({
      data: {
        id: nanoid(),
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    console.log("createdUser", createdUser);

    // Send email with verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("code", code);

    await prisma.verificationCode.create({
      data: { code, userId: createdUser.id, id: code },
    });

    await transporter.sendMail(
      mailOptionsForVerificationCode({
        sender: SMTP_FROM || "",
        email: createdUser.email,
        code: code,
      }),
      (error, info) => {
        if (error) {
          console.log("Email error: ", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  } catch (error) {
    console.error("[REGISTER_USER] Server Error", error);
    throw new Error(error);
  }
}
