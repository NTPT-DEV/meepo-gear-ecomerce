import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      payment_status: session?.payment_status || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error, message: "Inavalid Session ID" },
      { status: 500 }
    );
  }
}
