import { deleteProduct, getProduct, updateProduct } from "@/app/(main)/actions/products/products";
import { NextRequest, NextResponse } from "next/server";


// get product by ID
export async function GET({params} : {params : {id : string}} ){
     try {
      
      const { id } = params;
      const result = await getProduct({ params: { id } });

      return NextResponse.json({result} , {status : 200});

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong for get product by ID' }, { status: 500 });
      }
}

// Update product 
export async function PUT(req : NextRequest , context: { params: { id: string }}  ){
     try {
      const body = await req.json(); 
      const { id } = context.params
      
      await updateProduct(body , id);

      return NextResponse.json({message : 'This is API end point for Update products'}, { status: 200 })

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong for Update product' }, { status: 500 });
      }
}

// delete product
export async function DELETE({params} : {params : {id : string}}){
     try {

      const { id } = params; 

      if(!id){
        return NextResponse.json({message : "Product ID is required"}, {status : 400})
      }
      
      await deleteProduct(id);
      
      return NextResponse.json({message : 'Delete Product successfully'}, { status: 200 })

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong for deleting product' }, { status: 500 });
      }
}
