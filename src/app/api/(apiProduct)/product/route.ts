import { createProduct } from "@/app/(main)/actions/products/products";
import { NextRequest, NextResponse } from "next/server";

/// create Product
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log(payload , 'payloadddddddddddddddddddddd');
    if (!payload) {
      console.log("No have request data");
    }
    const result = await createProduct(payload);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Create product failed" },
      { status: 500 }
    );
  }
}
