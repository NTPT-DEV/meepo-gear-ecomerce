"use server" 
import { prisma } from '@/lib/prisma'
import bcrypt from "bcryptjs";
import { SignUpSchema, SignUpTypeSchema } from 'schemas/formSchemas';

export const registerAction = async ( data : SignUpTypeSchema) => {
    
    try { 
        const validatedData = SignUpSchema.parse(data) 
        
        const { email , name , password } = validatedData; 
         
        const hashPassword = await bcrypt.hash(password , 10)  

        const userExist = await prisma.user.findUnique({
            where : { email }
        })
        
        if( userExist ) {
            return {error : ("User already exist")};
            
        }
        const lowerCaseEmail = email.toLowerCase(); 
        const lowerCaseName = name.toLowerCase();
        
        const user = await prisma.user.create({
            data : {
                email : lowerCaseEmail , 
                name : lowerCaseName ,  
                password : hashPassword , 
                
            }
        });
       
        return { user , success : "User create successfully"}
    
    
    }catch(error){
          console.log(error)
          return {error : ("Something went wrong")}
    }
    }; 

