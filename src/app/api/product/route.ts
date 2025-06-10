import { createProduct, getallProduct } from "@/app/(dashboard)/actionDashboard/products/products";
import { NextRequest, NextResponse } from "next/server";

/// create Product
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    if (!payload) {
      console.log("No have request data from client");
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

/// Get All Product 
export async function GET() {
  try {
    const products = await getallProduct()
    return NextResponse.json({products} , {status : 200})
  }catch(error) {
    console.log(error , 'Error in get all Products');
    return NextResponse.json({message : 'Error in get all Products'} , {status : 500})
  }
}
