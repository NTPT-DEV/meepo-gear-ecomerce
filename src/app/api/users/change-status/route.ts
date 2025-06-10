
import { changeStatus } from "@/app/(main)/actions/users/users";
// import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


//Change Status
export async function POST(req : NextRequest) {
    try {
    //   const session = await auth(); 
    //   if (!session) {
    //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //     }
        const { id , statusUser } = await req.json();
  
        if(!id ) {
          return NextResponse.json({message : 'Invalid data ID'} , {status : 400})
        }
  
        const users = await changeStatus( id , statusUser);
  
        return NextResponse.json(
          { users, message: "Change Status Success" },
          { status: 200 }
        );
  
  
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Change Status Error" },
        { status: 500 }
      );
    }
  }
  