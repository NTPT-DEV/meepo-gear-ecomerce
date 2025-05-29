import { prisma } from "@/lib/prisma";

interface CreateCategoryInput {
  nameCategory: string;
  categoryImage: {
    asset_id: string;
    public_id: string;
    url: string;
    secure_url: string;
  }[];
}


export const createCategory = async ({ nameCategory, categoryImage }: CreateCategoryInput) => {

    if (!nameCategory || !categoryImage) {
      console.log('Not have some data to create category');
      return 
    }

    const existCategory = await prisma.category.findFirst({
      where: {
        name: nameCategory.trim(),
      },
    })

    if(existCategory) {
      console.log('Category already exist');
      return 
    }

    
    const nameLowerCase = nameCategory.toLowerCase().trim();
    

    const create = await prisma.category.create({
         data: {
           name: nameLowerCase,
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
     return create;
} 

export const getAllCategory = async () => {
  try {
    const getAll = await prisma.category.findMany({
      include :{
        categoryImage : true 
      }
    })
    console.log(getAll);
    return getAll

  }catch(error) {
    console.log(error , 'Error in get all category');
    throw new Error('Error in get all category');
  }
}

export const deleteCategory = async (id : string ) => {
  try { 

    const CategoryRemove = await prisma.category.delete({
      where : {
        id : id 
      }
    })
    return CategoryRemove


  }catch(error){
    console.log(error , 'Error in delete category');
  }
}

