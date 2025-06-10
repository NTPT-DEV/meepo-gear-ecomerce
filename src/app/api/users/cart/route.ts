
// import { addToCart } from "@/app/(main)/actions/cart/cart";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req : NextRequest){ 
//     try { 
  
//     }catch(error){
//       console.log(error);
//       return NextResponse.json({message : 'Server Error'} , {status : 500})
//     }
//     }

export async function POST(req : NextRequest){ 
  try { 
    
//    await addToCart(req)
   NextResponse.json({message : 'Add TO CART'} , {status : 200})
    
  }catch(error){
    console.log(error);
    return NextResponse.json({message : 'Server Error'} , {status : 500})
  }
  }


// export async function DELETE(req : NextRequest){ 
//   try { 

//   }catch(error){
//     console.log(error);
//     return NextResponse.json({message : 'Server Error'} , {status : 500})
//   }
//   }
