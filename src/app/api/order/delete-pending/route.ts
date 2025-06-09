import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function DELETE(){
    const sessionUser = await auth()
    const userId = sessionUser?.user.id
    if(!sessionUser) { 
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try { 
        const deleteOrderWhenResetCart = await prisma.order.deleteMany({
            where : {
                userId : userId,
                orderStatus : 'pending'
            }
        })

        return NextResponse.json({ success : true , deleteOrderWhenResetCart} , {status : 200})

 
    }catch(error){
        return NextResponse.json({error , message : 'Something went wrong on delete pending'} , {status:500})
    }
}
