import { searchFilterProduct } from "@/app/(main)/actions/products/products";
import { NextRequest, NextResponse } from "next/server";
import { TSearchTypeSchema } from "schemas/productFormSchema";

export async function POST(req : NextRequest) {
  try {
    const data: TSearchTypeSchema = await req.json();
    await searchFilterProduct(data);
    
    return NextResponse.json(
      { data , message: "Search filter endpoint reached successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong while processing search filters" },
      { status: 500 }
    );
  }
}
