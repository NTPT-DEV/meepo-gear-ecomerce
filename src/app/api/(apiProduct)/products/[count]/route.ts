import { getAllProducts } from "@/app/(main)/actions/products/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req : NextRequest , context : { params: { count: string } }) {
  try {
    
    const { count } = context.params
    const products = await getAllProducts(parseInt(count));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong for get product by ID" },
      { status: 500 }
    );
  }
}
