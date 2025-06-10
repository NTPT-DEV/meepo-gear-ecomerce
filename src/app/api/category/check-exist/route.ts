import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req : NextRequest) { 
    const body = await req.json();
    const { nameCategory } = body;
    
    if(!nameCategory){
        return NextResponse.json({
            message : 'This name category is available'
        })
    }

   const existingCategory = await prisma.category.findFirst({
        where : {
            name : nameCategory
        }
    })

    return NextResponse.json({
        exists : !!existingCategory , 
        message : existingCategory ? 'Category already exists' : 'Category created successfully'
    })

}