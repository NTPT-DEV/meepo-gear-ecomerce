import { prisma } from "prisma/prisma";
import { ProductTypeSchema, TgetProductByTypeSchema } from "schemas/productFormSchema";

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

//// Get all products
export const getAllProducts = async (data: ProductTypeSchema) => {
  try {
    const { quantity } = data;
    const products = await prisma.product.findMany({
      take: quantity,
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
      const { sort , order , limit } = data;
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
export const getProduct = async (data: ProductTypeSchema) => {
  try {
    const { id } = data;
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
export const updateProduct = async (data: ProductTypeSchema) => {
  try {
    const {
      id,
      name,
      title,
      description,
      price,
      quantity,
      categoryId,
      images,
    } = data;

    await prisma.images.deleteMany({
      where: {
        productId: id,
      },
    });

    const product = await prisma.product.update({
      where: { id: id },
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

///delete a product
export const deleteProduct = async (id: string) => {
  try {
    const deleteProduct = await prisma.product.delete({
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

/// Search Filter products
export const searchFilterProduct = async (data : SeacrhTypeSchema) => {
  try {
    const { query, category, price } = data;
    if (query) { 
        console.log(query);
    }
    if(category) {
        console.log(category);
    }
    if(price) {
        console.log(price);
    }


  } catch (error) {
    console.log(error);
    return { error: "Error getting products" };
  }
};
