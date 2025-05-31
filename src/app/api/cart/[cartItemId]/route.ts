import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_req : NextRequest , {params} : { params : Promise<{cartItemId : string}>} ) { 
    
    const {cartItemId} = await params

    if(!cartItemId) {
        console.log('no product ID');
        return NextResponse.json({messgae : 'No Product ID'} , {status : 400})

    }
    console.log(cartItemId , 'This is ProductID');

    try { 
        const itemCart = await prisma.cartItem.findUnique({
            where : {
                id : cartItemId
            }
        })

        if(!itemCart) {
            return NextResponse.json({messgae : 'Product not found in cart'} , {status : 400})
        }

        await prisma.cartItem.delete({
        where : {
            id : cartItemId
        }
    })
    return  NextResponse.json({messgae : 'Product removed from cart'} , {status : 200})

    }catch(error) { 
        return NextResponse.json({error} , {status : 500})
    }
   
}