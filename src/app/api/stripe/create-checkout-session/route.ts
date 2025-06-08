import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cartStore";

export async function POST(req: NextRequest) {
  try {
    const cartCheckout = await req.json();
    console.log(cartCheckout);
    if (!cartCheckout || cartCheckout.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_BASE_URL;

    // CREATE SESSION
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: cartCheckout.map((item: CartItem) => ({
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

    return NextResponse.json(
      { clientSecret : session.client_secret , success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
