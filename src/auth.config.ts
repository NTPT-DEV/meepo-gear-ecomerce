import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { SignInSchema } from '../schemas/formSchemas'
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"


export default { 
    providers: [
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedData =  SignInSchema.safeParse(credentials);
                
                if(!validatedData.success) return null

                const { email , password } = validatedData.data; 

                const user = await prisma.user.findFirst({
                    where : { email } ,
                    select : {
                        id : true , 
                        email : true ,
                        name : true , 
                        password : true , 
                        role : true , 
                        statusUser : true , 
                    },
                })
               

                if(!user || !user.password || !user.statusUser) {
                    return null 
                }

                 const passwordsMatch = await bcrypt.compare(password , user.password); 
                 if(passwordsMatch){
                    return {
                        id : user.id , 
                        email : user.email , 
                        name : user.name , 
                        role : user.role , 
                        statusUser : user.statusUser
                    } 
                } 
                return null

            }})
            

    ] 
    
    } satisfies NextAuthConfig
