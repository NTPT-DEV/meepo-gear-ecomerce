import {
  deleteCategory,
  editCategory,
} from "@/app/(main)/actions/products/category";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await params; 
      const { name } = await req.json();
  
      const result = await editCategory({ id, name });
      return NextResponse.json(result , { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong for editing category' }, { status: 500 });
    }
  }

  
export async function DELETE(_req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const result = await deleteCategory(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong for deleting category' }, { status: 500 });
  }
}
