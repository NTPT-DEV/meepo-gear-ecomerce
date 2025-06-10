import { searchProduct } from "@/app/(main)/actions/products/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req : NextRequest , context : {params : Promise<{slug : string}>}) { 
    try {
        const params = await context.params
        const searchParams = params.slug
        if(!searchParams){
            
        return NextResponse.json([], {status: 200})
        } 

        const products = await searchProduct(searchParams)
        return NextResponse.json(products, {status: 200})

    }catch(error){ 
        console.log(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
    
}