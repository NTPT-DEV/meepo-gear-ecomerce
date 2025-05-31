import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";


export async function GET() { 
    const session = await auth();
    
    if(!session || !session.user?.id) { 
    return NextResponse.json('no session' , {status : 401});
    }
    try { 
        const cart = await prisma.cart.findFirst({
            where : {
                userId : session.user.id
            }
        })
        if(!cart) { 
            return NextResponse.json({ cartItem : []} , {status : 200})
        }
        
        const cartItems = await prisma.cartItem.findMany({
            where : {
                cartId : cart.id
            } , 
            include: {
                product : {
                    select :  {
                        id : true,
                        name : true,
                        images : true,
                        price : true,
                        quantity : true
                    }
                } ,

            }
        })
      return NextResponse.json({cartItems} , {status : 200 })  
    }catch(error) { 
        return NextResponse.json({error}, {status : 500})
    }
}


export async function POST(req : NextRequest) { 
    const session = await auth();
    if(!session || !session.user?.id) { 
    return NextResponse.json('no session' , {status : 401});
    }

    try { 
        const dataCart = await req.json();
        const { productId , quantity , price} = dataCart;

        let cart = await prisma.cart.findFirst({
            where : {
                userId : session.user.id,            
            }
        }) 

        if(!cart) { 
             cart = await prisma.cart.create({
                data :  { 
                    userId : session.user.id,
                    cartTotal: 0
                }
            })
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where : {
                cartId : cart.id , 
                productId : productId
            }
        })
        if(existingCartItem) { 
            await prisma.cartItem.update({
                where : {
                    id : existingCartItem.id 
                }, 
                data : {
                    quantity : existingCartItem.quantity + 1
                }
            })
        } else {
            await prisma.cartItem.create({
                data : {
                    cartId : cart.id ,
                    productId ,
                    price ,
                    quantity
                }
            })
        }

     return NextResponse.json({productId , quantity , price} , {status : 200})

    }catch(error){ 
        return NextResponse.json({error} , {status : 500})
    } 
}


export async function DELETE() { 
    try { 
        const session  = await auth()
        if(!session || !session.user?.id) { 
            return NextResponse.json('no session' , {status : 401});

        }
        
        const userId = session.user.id

        const cart = await prisma.cart.findFirst({
            where : { 
                userId : userId 
            }
        })

        if(!cart) { 
            return NextResponse.json({message : 'No cart to delete'})
        }

        await prisma.cartItem.deleteMany({
            where : {
                cartId : cart.id , 
            }
        })

        await prisma.cart.delete({
            where : {
                id : cart.id
            }
        })

        return NextResponse.json({message : ''})

    }catch(error) { 
        return NextResponse.json({error} , {status : 500})
    }
}