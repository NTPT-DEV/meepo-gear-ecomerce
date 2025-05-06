"use server";
import { prisma } from "@/../prisma/prisma";

// Create Category

export const addCategory = async (data: string) => {
  try {
    const nameCategory = data;
    //get data from formdata
    // const nameCategory = data.get('name') as string ;

    // check text input at least 3 characters
    if (!nameCategory || nameCategory.length < 3 || nameCategory.length === 0) {
      return { error: "Category name must be at least 3 characters long." };
    }
    // check if category already exist
    const category = await prisma.category.findFirst({
      where: {
        name: nameCategory,
      },
    });

    if (category) {
      return { error: "Category already exists." };
    }
    //Create category
    const createCategory = await prisma.category.create({
      data: {
        name: nameCategory, // <= from form data input
      },
    });
    return { createCategory, success: "Category created successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again." };
  }
};

// Get All Category

export const getAllCategory = async () => {
  try {
    // find and get all data in prisma category
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again." };
  }
};

/// Edit Category

export const editCategory = async (data: { id: string; name: string }) => {
  try {
    // const idCategory = data.get('id') as string ;
    // const nameCategory = data.get('name') as string ;
    const { id, name } = data;

    if (!name || name.length < 3 || name.length === 0) {
      return { error: "Category name must be at least 3 characters long." };
    }
    const editCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return { editCategory, success: "Category updated successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again." };
  }
};

// Delete Category ***

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: { id },
    });
    return { success: "Category deleted successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again." };
  }
};
