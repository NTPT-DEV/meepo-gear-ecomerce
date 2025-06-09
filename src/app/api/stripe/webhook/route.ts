import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  if (!body) {
    return NextResponse.json({ message: "Invalid Body" }, { status: 400 });
  }
  const rawHeader = await headers();
  const signature = rawHeader.get("Stripe-Signature") as string;

  if (!signature) {
    return NextResponse.json({ message: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId 

    if(!orderId) {
      console.log('No order id');
      return NextResponse.json({ message: "No order id" }, { status: 400 });
    
    }

    if (event.type === "checkout.session.completed") {
      console.log("Payment sucessful for user");
      const payment = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );

      if (!payment) {
        console.log("payment not found");
        return NextResponse.json({ message: "Payment not found" }, { status: 404 });
      }

    const updateOrderStatus =  await prisma.order.update({
        where : { 
          id : orderId
        } , 
        data : {
          orderStatus : 'paid'
        }
      })

      if(!updateOrderStatus) { 
        console.log('order status not updated or pending');
        return NextResponse.json({ message: "order status not updated or pending" }, { status: 400 });
      }

      const order = await prisma.order.findUnique({
        where : { 
          id : orderId
        } , 
        include : {
          products : true
        }
      })

      if(!order) {
        console.log(order);
        return NextResponse.json({ message: "order not found" }, { status: 404 });
      }

      for( const item of order.products ) { 
        await prisma.product.update({
          where : {
            id  : item.productId
          } , 
          data : {
            quantity : {
              decrement : item.quantity
            }
          }
        })
      }
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Webhook Error", error },
      { status: 400 }
    );
  }
}
