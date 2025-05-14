import { deleteImageCloudinary } from "@/app/(dashboard)/actionDashboard/delete/deleteImage";
import { deleteCategory } from "@/app/(main)/actions/products/category";

import { NextRequest, NextResponse } from "next/server";


//// Delete Category 
export async function DELETE(req : NextRequest, {params} : {params : {id : string}}) { 
    try {

        const data =  await req.json()
        const { public_id } = data
        console.log(data);
        console.log(public_id);
        console.log(params.id);


        
        if(!params.id || !public_id) {
            console.log("Missing category ID or public_id");
            return NextResponse.json({error : 'Missing category ID or public_id'} , {status : 400})
        }


        const removeCategory =  await deleteCategory(params.id) ;
        console.log(removeCategory);


        const removeImg =  await deleteImageCloudinary(public_id)


        return NextResponse.json({removeCategory , removeImg , messgae : 'Category Deleted Sucessfuly' } , {status : 200})

    }catch(error) {
        console.log(error);
        NextResponse.json({error : 'Something went wrong in deleting'} , {status : 500})
    }
 }