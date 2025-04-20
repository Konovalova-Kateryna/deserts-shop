import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json("Помилка авторизації", { status: 401 });
    }

    const data = await prisma.user.findFirst({
      where: {
        id: userSession.user.id,
      },
      select: {
        email: true,
        fullName: true,
        // phone: true,
        // address: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET_PERSONAL_DATA]", error);
    return NextResponse.json("[GET_PERSONAL_DATA] Server Error", {
      status: 500,
    });
  }
}
