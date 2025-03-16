import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next/auth";
import { prisma } from "@/prisma/prisma-client";

// get all favorite products
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("userToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const favoriteProducts = await prisma.favorite.findMany({
      where: {
        userId: token,
      },
      include: {
        product: true,
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

// add product to favorite

export async function POST(req: NextRequest) {
  try {
    // const token = req.cookies.get("userToken")?.value;
    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    const { productId, userId } = await req.json();
    const favoriteProduct = await prisma.favorite.create({
      data: {
        userId: userId,
        productId,
      },
    });
    return NextResponse.json(favoriteProduct);
  } catch (error) {
    console.log("[FAVORITE_POST] Server Error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     // const session = await auth();
//     // if (!session) {
//     //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     // }

//     const favorite = await prisma.favorite.findMany();
//     return NextResponse.json(favorite);
//   } catch (error) {
//     console.log("[FAVORITE_GET] Server Error", error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET_BY_ID(req: NextRequest) {
//   console.log("Get by id", req);
//   const favoriteId = req.nextUrl;
//   const favorite = await prisma.favorite.findUnique({
//     where: {
//       id: favoriteId,
//     },
//   });
//   return NextResponse.json(favorite);
// }

// export async function POST(req: NextRequest) {
//   try {
//     // const session = await getServerSession({ req });

//     // if (!session) {
//     //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     // }

//     const { productId } = await req.json();
//     // const userId = session.userId;
//     console.log("str 15 route favorite", productId);
//     const userId = "1";

//     if (!userId || !productId) {
//       return NextResponse.json({ message: "Missing data" }, { status: 400 });
//     }

//     const favorite = await prisma.favorite.create({
//       data: {
//         userId,
//         productId,
//       },
//     });
//     return NextResponse.json(favorite, { status: 201 });
//   } catch (error) {
//     console.log("[FAVORITE_POST] Server Error", error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: NextRequest) {
//   try {
//     // const session = await getServerSession({ req });
//     // if(!session) {
//     //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     // }
//     const { productId } = await req.json();
//     // const userId = session.userId;
//     const userId = "1";
//     const favorite = await prisma.favorite.deleteMany({
//       where: {
//         userId,
//         productId,
//       },
//     });
//     console.log("[FAVORITE_DELETE] favorite", favorite);
//     return NextResponse.json(favorite);
//   } catch (error) {
//     console.log("[FAVORITE_DELETE] Server Error", error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
