import { prisma } from "@/lib/prisma";


export const getProductById = async(id : string) => {
    try { 
        const productResponse = await prisma.product.findUnique({
            where : {
                id  : id
            } , include : {
                category : true , 
                images : true
            }
        })
        return productResponse 
    }catch(error){ 
        console.log(error);
    }
}