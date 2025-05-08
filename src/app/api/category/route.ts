import { addCategory , getAllCategory } from "@/app/(main)/actions/products/category";
import { NextRequest, NextResponse } from "next/server";


/// Get All Category 
export async function GET() { 
    try {
        const result = await getAllCategory(); 
        
        return NextResponse.json(result , {status: 200});
    }catch(error) {
        console.log(error);
        return NextResponse.json({error : "Something went wrong to get Category" }, { status: 500});
    }
}


/// Create Catagory
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await addCategory(body.name);

    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
        return NextResponse.json({ error : "Something went wrong to create Category"} , { status: 500});
  }
}


