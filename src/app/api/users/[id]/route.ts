import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


/// Change Status User
export async function PATCH(req : NextRequest , {params} : {params : Promise<{id : string}>}) { 
    const { statusUser } = await req.json()
    const { id } = await params
    if(!id ) {
        return NextResponse.json({message : 'id or body not found'} , {status : 400})
    }

    if(typeof  statusUser !== 'boolean'){
        return NextResponse.json({message : 'Status data is not boolean'} , {status : 400})
    }

    try { 

        const updateStatusUser = await prisma.user.update({
            where : {
                id : id
            } , 
            data : {
                statusUser : statusUser 
            }
        })

        return NextResponse.json({updateStatusUser , message : 'Update status user success'} , {status : 200})

    }catch(error){
        return NextResponse.json({error}, {status: 500})
    }
}