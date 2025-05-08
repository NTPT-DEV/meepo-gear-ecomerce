import { getProductsBy } from "@/app/(main)/actions/products/products";
import { NextRequest, NextResponse } from "next/server";
import { getProductByTypeSchema } from "schemas/productFormSchema";


export async function GET(req: NextRequest) {
  
  const { searchParams } = new URL(req.url);

  const rawParams = {
    sort: searchParams.get("sort") ?? "",         
    order: searchParams.get("order") ?? "",       
    limit: Number(searchParams.get("limit")),     
    quantity: Number(searchParams.get("quantity")) 
  };

  const result = getProductByTypeSchema.safeParse(rawParams);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",         
        issues: result.error.format(),            
      },
      { status: 400 }
    );
  }

  const data = result.data;

  const response = await getProductsBy(data);

  return NextResponse.json(response, { status: 200 });
}
