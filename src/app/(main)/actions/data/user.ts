import { prisma } from '@/../prisma/prisma'

export const getUserById = async (id : string ) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id : id
                },
                select : {
                    id : true , 
                    name : true , 
                    email : true , 
                    role : true , 
                    statusUser : true , 
                    image : true , 
                }
            })
            return user ; 
    } catch (error) {
        console.error("Error fetching user:", error);
        return null ;
    }
}