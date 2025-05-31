import { prisma } from "@/lib/prisma"

 export const getProductBycategory = async ({categoryId } : {categoryId : string}) => {
            const res = await prisma.product.findMany({
                where : {
                    categoryId : categoryId
                } , include : {
                    category : true,
                    images : true
                }
            })
            return res
        }