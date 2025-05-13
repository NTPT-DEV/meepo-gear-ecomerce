"use server";

import type { SignInTypeSchema } from "schemas/formSchemas";
import { SignInSchema } from "schemas/formSchemas";
import { signIn } from "@/auth";
import { prisma } from "@../../prisma/prisma";

export const loginAction = async (data: SignInTypeSchema) => {

  try {
    const validatedDate = SignInSchema.parse(data);
    const { email, password } = validatedDate; 
    const LowerCaseEmail = email.toLowerCase()
    

    const userExist = await prisma.user.findFirst({
      where: {
        email: LowerCaseEmail
      },
    });
    
   

    if (!userExist) {
      return { error: "User not found or account is disabled" };
    }
      await signIn("credentials", {
      email: userExist.email,
      password: password,
      redirect : false
    });
   


  } catch (error){
    console.log(error , 'check error');
    return { error: "Something went wrong. Please try again."};
  }
  
  return { success: "User logged in successfully" };
};
