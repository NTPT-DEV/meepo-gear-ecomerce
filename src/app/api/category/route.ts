import { createCategory, getAllCategory } from "@/app/(main)/actions/products/category";
import { NextRequest, NextResponse } from "next/server";


interface CreateCategoryInput {
  nameCategory: string;
  categoryImage: {
    asset_id: string;
    public_id: string;
    url: string;
    secure_url: string;
  }[];
}


/// create Category API
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nameCategory, categoryImage }: CreateCategoryInput = data;

   const  addCategory = await createCategory({ nameCategory, categoryImage });

    return NextResponse.json(
      { addCategory, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error } , { status: 500 });
  }
}

//// Get All Categories
export async function GET(){
  try {
  const categories = await getAllCategory()

   return NextResponse.json({
    categories , 
    success : true , 
    message : 'Get category all successfully'}, 
    {status : 200})

  }catch(error) {
    console.log(error);
    return NextResponse.json({error : 'Something went wrong in getting'} , {status : 500});
  }
}
