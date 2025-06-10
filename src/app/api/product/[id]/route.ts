import { deleteImageCloudinary } from "@/app/(dashboard)/actionDashboard/delete/deleteImage";
import { deleteProduct } from "@/app/(dashboard)/actionDashboard/products/products";
import { getProductById } from "@/app/(main)/actions/products/getProductById";
import { NextRequest, NextResponse } from "next/server";

// Get product by ID
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      console.log('"Product ID is required"');
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await getProductById(id);
    if (!product) {
      console.log('"Product not found"');
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { public_id } = await req.json();
    const { id } = params;

    if (!id || !public_id) {
      console.log('"Product ID or Public ID is required"');
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    await deleteProduct(id);

    await deleteImageCloudinary(public_id);

    return NextResponse.json(
      { message: "Delete Product successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong for deleting product" },
      { status: 500 }
    );
  }
}
