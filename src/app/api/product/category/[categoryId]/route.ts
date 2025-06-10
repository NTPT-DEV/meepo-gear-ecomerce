import { getProductBycategory } from "@/app/(main)/actions/products/getProductByCategory";
import { NextRequest, NextResponse } from "next/server";

//// Get Category
export async function GET(_req : NextRequest ,  {params} : {params : Promise<{categoryId : string}>}) { 
    try { 
        const { categoryId } = await params;

        if(!categoryId) { 
             return NextResponse.json({error : 'No params catgeory ID'} , {status : 400})
        }
        const products = await getProductBycategory( {categoryId} )

        return NextResponse.json({products} , {status : 200})
        
    }catch(error){
        console.log(error);
        return NextResponse.json({error : 'Something went wrong in getting by category'} , {status : 500})
    } 
}