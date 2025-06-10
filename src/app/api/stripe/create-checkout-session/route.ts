import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cartStore";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const sessionUser = await auth();
  const userId = sessionUser?.user.id;
  const origin = process.env.NEXT_PUBLIC_BASE_URL;

  if (!userId) {
    return NextResponse.json({ message: "No user ID" }, { status: 401 });
  }
  try {
    const cart = await req.json();
    if (!cart || cart.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const checkExistOrder = await prisma.order.findFirst({
      where: {
        userId: userId,
        orderStatus: "pending",
      },
    });

    let order = checkExistOrder;

    if (checkExistOrder) {
      await prisma.order.deleteMany({
        where: {
          userId: userId,
          orderStatus: "pending",
        },
      });

      order = await prisma.order.create({
        data: {
          userId: userId,
          cartTotalPrice: cart.reduce(
            (acc: number, item: CartItem) =>
              acc + item.product.price * item.quantity,
            0
          ),
          products: {
            create: cart.map((item: CartItem) => ({
              quantity: item.quantity,
              price: item.product.price,
              product: {
                connect: { id: item.product.id },
              },
            })),
          },
        },
      });
      if (order) {
        console.log("Order new updated");
      }
    }

    if (!checkExistOrder) {
      order = await prisma.order.create({
        data: {
          userId: userId,
          cartTotalPrice: cart.reduce(
            (acc: number, item: CartItem) =>
              acc + item.product.price * item.quantity,
            0
          ),
          products: {
            create: cart.map((item: CartItem) => ({
              quantity: item.quantity,
              price: item.product.price,
              product: {
                connect: { id: item.product.id },
              },
            })),
          },
        },
      });

      if (order) {
        console.log("New order created");
      }
    }

    if (!order?.id) {
      return NextResponse.json(
        { message: "Order creation failed" },
        { status: 500 }
      );
    }

    // CREATE SESSION
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      metadata: {
        orderId: order?.id ?? "",
      },
      payment_method_types: ["card"],
      line_items: cart.map((item: CartItem) => ({
        price_data: {
          currency: "thb",
          unit_amount: Math.round(item.product.price * 100),
          product_data: {
            name: item.product.name,
            images: item.product?.images?.length
              ? [item.product?.images[0].secure_url]
              : [],
          },
        },
        quantity: item.quantity,
      })),

      return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    if (!session) {
      return NextResponse.json(
        { message: "No session create" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { clientSecret: session.client_secret, order, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CREATE_CHECKOUT_SESSION_ERROR]", error);
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
  }
}
