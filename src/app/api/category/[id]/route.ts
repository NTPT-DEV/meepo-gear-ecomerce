import { deleteImageCloudinary } from "@/app/(dashboard)/actionDashboard/delete/deleteImage";
import { deleteCategory } from "@/app/(dashboard)/actionDashboard/products/category";

import { NextRequest, NextResponse } from "next/server";


//// Delete Category 
export async function DELETE(req : NextRequest, {params} : {params : Promise<{id : string}>}) { 
    try {
        const { id } = await params
        const {public_id} =  await req.json()
       
        if(!id || !public_id) {
            console.log("Missing category ID or public_id");
            return NextResponse.json({error : 'Missing category ID or public_id'} , {status : 400})
        }

        const removeCategory =  await deleteCategory(id) ;
        console.log(removeCategory);


        const removeImg =  await deleteImageCloudinary(public_id)


        return NextResponse.json({removeCategory , removeImg , messgae : 'Category Deleted Sucessfuly' } , {status : 200})

    }catch(error) {
        console.log(error);
        return NextResponse.json({error : 'Something went wrong in deleting'} , {status : 500})
    }
 }