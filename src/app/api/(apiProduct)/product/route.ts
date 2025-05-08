import { createProduct } from "@/app/(main)/actions/products/products";
import { NextRequest, NextResponse } from "next/server";

/// create Product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await createProduct(body);

    return NextResponse.json({ result }, { status: 200 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Create product failed" },
      { status: 500 }
    );
  }
}
