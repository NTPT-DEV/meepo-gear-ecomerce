import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import {
  ProductTypeSchema,
  TgetProductByTypeSchema,
  TSearchTypeSchema,
} from "schemas/productFormSchema";

//// Create a new product
export const createProduct = async (data: ProductTypeSchema) => {
  try {
    const { name, title, description, price, quantity, categoryId, images } =
      data;
    const product = await prisma.product.create({
      data: {
        name: name,
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        categoryId: categoryId,

        ///wait for the image to be uploaded to cloudinary and get the url
        images: {
          create: images.map((img) => ({
            asset_id: img.asset_id,
            public_id: img.public_id,
            url: img.url,
            secure_url: img.secure_url,
          })),
        },
      },
    });

    return { product, success: "Product created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error creating product" };
  }
};

//// Get all products by count
export const getAllProducts = async (count: number) => {
  try {
    const products = await prisma.product.findMany({
      take: count,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    return { products, success: "Products fetched successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error getting products" };
  }
};

/// Get Products by
export const getProductsBy = async (data: TgetProductByTypeSchema) => {
  try {
    const { sort, order, limit } = data;
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: {
        category: true,
      },
    });

    return { products, success: "Get products successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error getting products" };
  }
};

//// Get a single product
export const getProduct = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const products = await prisma.product.findFirst({
      where: {
        id: id,
      },
      include: {
        category: true,
        images: true,
      },
    });
    return { products, success: "Product fetched successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error getting product" };
  }
};

///uppdate a product
export const updateProduct = async (data: ProductTypeSchema, id: string) => {
  try {
    const { name, title, description, price, quantity, categoryId, images } =
      data;

    await prisma.images.deleteMany({
      where: {
        productId: id,
      },
    });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name,
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        categoryId: categoryId,

        ///wait for the image to be uploaded to cloudinary and get the url
        images: {
          create: images.map((img) => ({
            asset_id: img.asset_id,
            public_id: img.public_id,
            url: img.url,
            secure_url: img.secure_url,
          })),
        },
      },
    });

    return { product, success: "Product updated successfully" };
  } catch (error) {
    console.log(error, "Error updating product");
    return { error: "Error updating product" };
  }
};

///Delete a product
export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return { deleteProduct, success: "Product deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error deleting product" };
  }
};

// / Search Filter products

const handleQuery = async (query: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include : {
        category : true 
      }
    });
    NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  NextResponse.json({ error: "Error getting products" }, { status: 500 });
};

const handleCategory = async (categoryId : string[]) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId : {
          in : categoryId.map((id) =>  id )
        },
      },
      include : {
        category : true 
      }
    });
    NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  NextResponse.json({ error: "Error getting products" }, { status: 500 });
}

const handlePrice = async (priceRange: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price : {
          gte : Number(priceRange[0]) , 
          lte : Number(priceRange[1])
       }
      },
      include : {
        category : true ,
        images : true 
      }
    });
    NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  NextResponse.json({ error: "Error getting products" }, { status: 500 });
 }

export const searchFilterProduct = async (data: TSearchTypeSchema) => {
  try {
    const { query, category, price } = data;
    if (query) {
      console.log(query);
      await handleQuery(query);
      NextResponse.json({ message: "Search filter endpoint reached successfully" }, { status: 200 });
    }
    if (category) {
      console.log(category);
      await handleCategory(category)
    }
    if (price) {
      console.log(price);
      await handlePrice(price)
    }
  } catch (error) {
    console.log(error);
    return { error: "Error getting products" };
  }
};

