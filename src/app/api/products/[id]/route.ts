import { NextResponse , NextRequest } from "next/server";



export function GET( req : NextRequest ,  context: { params: { id: string } }) { 
    const { params } = context; 
    console.log(context);
    return NextResponse.json({ message : 'Test Create Category :' , id : params.id  });

}