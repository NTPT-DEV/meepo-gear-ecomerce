import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";

/// create Category API
interface CreateCategoryInput {
  nameCategory: string;
  categoryImage: {
    asset_id: string;
    public_id: string;
    url: string;
    secure_url: string;
  }[];
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nameCategory, categoryImage }: CreateCategoryInput = data;

    const createCategory = await prisma.category.create({
      data: {
        name: nameCategory,
        categoryImage: {
          create: categoryImage.map((imgUrl) => ({
            asset_id: imgUrl.asset_id,
            public_id: imgUrl.public_id,
            url: imgUrl.url,
            secure_url: imgUrl.secure_url,
          })),
        },
      },
      include: {
        categoryImage: true,
      },
    });

    return NextResponse.json(
      { createCategory, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error } , { status: 500 });
  }
}
