import { deleteImageCloudinary } from "@/app/(dashboard)/actionDashboard/delete/deleteImage";
import { deleteCategory } from "@/app/(main)/actions/products/category";

import { NextRequest, NextResponse } from "next/server";


//// Delete Category 
export async function DELETE(req : NextRequest, {params} : {params : Promise<{id : string}>}) { 
    try {
        const resolveParams = await params
        const data =  await req.json()
        const { public_id } = data
        console.log(data);
        console.log(public_id);
        console.log(resolveParams.id);


        
        if(!resolveParams.id || !public_id) {
            console.log("Missing category ID or public_id");
            return NextResponse.json({error : 'Missing category ID or public_id'} , {status : 400})
        }


        const removeCategory =  await deleteCategory(resolveParams.id) ;
        console.log(removeCategory);


        const removeImg =  await deleteImageCloudinary(public_id)


        return NextResponse.json({removeCategory , removeImg , messgae : 'Category Deleted Sucessfuly' } , {status : 200})

    }catch(error) {
        console.log(error);
        return NextResponse.json({error : 'Something went wrong in deleting'} , {status : 500})
    }
 }