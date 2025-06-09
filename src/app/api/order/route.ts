import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orderList = await prisma.order.findMany({
      include: {
        user: {
            select : {
                id : true,
                name : true,
                email : true,
            }
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json({ orderList }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error, message: "Something went wrong to get Orders" },
      { status: 500 }
    );
  }
}
