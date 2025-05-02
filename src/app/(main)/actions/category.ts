'use server'
import {prisma} from '../../../../prisma/prisma'


// Create Category 

export const addCategory = async (data: FormData) => {
    try {

        const nameCategory = data.get('name') as string ; 

        if (!nameCategory || nameCategory.length < 3 || nameCategory.length === 0) {
            return { error: "Category name must be at least 3 characters long." };
        }

        const category = await prisma.category.findFirst({
            where : {
                name: nameCategory
            }
        })

        if (category) {
            return { error: "Category already exists." };
        }

        const createCategory = await prisma.category.create({
            data: {
                name: nameCategory
            }
        });
        return { createCategory, success: "Category created successfully." };

    }catch(error) {
        console.log(error);
        return { error: "Something went wrong. Please try again." };
    }
}

// Get All Category 

export const getAllCategory = async () => {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.log(error);     
        return { error: "Something went wrong. Please try again." };
    }
}

export const editCategory = async (data: FormData) => {
    try {
        const idCategory = data.get('id') as string ; 
        const nameCategory = data.get('name') as string ;

        if (!nameCategory || nameCategory.length < 3 || nameCategory.length === 0) {
            return { error: "Category name must be at least 3 characters long." };
        }
        const editCategory = await prisma.category.update({
            where : {
                id : idCategory
            } , 
            data : {
                name : nameCategory
            }
        });

        return { editCategory, success: "Category updated successfully." };

    } catch (error) {
        console.log(error);
        return { error: "Something went wrong. Please try again." };
    }
}

// Delete Category *** 

export const deleteCategory = async (data : FormData) => {
    try {
        const  idCategory  = data.get('id') as string ;
          await prisma.category.delete({
            where : {
                id : idCategory
            }
        });
        return { success: "Category deleted successfully." };
    } catch(error) {
        console.log(error);
        return { error: "Something went wrong. Please try again." };
    }
} 