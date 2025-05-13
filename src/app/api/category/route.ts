import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest) {
  try {
    
    const data = await req.json()
    const {nameCategory , categoryImage} = data
    console.log(nameCategory , categoryImage);



    return NextResponse.json({}, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
