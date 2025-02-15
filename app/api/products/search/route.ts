import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  if (!query.trim()) {
    return NextResponse.json([], { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          titleUa: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 5,
  });

  return NextResponse.json(products);
}
