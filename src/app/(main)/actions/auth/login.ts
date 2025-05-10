"use server";

import type { SignInTypeSchema } from "schemas/formSchemas";
import { SignInSchema } from "schemas/formSchemas";
import { signIn } from "@/auth";
import { prisma } from "@../../prisma/prisma";

export const loginAction = async (data: SignInTypeSchema) => {

  try {
    const validatedDate = SignInSchema.parse(data);
    console.log(validatedDate , 'check validatedDate');
    const { email, password } = validatedDate;
    
    const LowerCaseEmail = email.toLowerCase()
    console.log(LowerCaseEmail , 'check LowerCaseEmail');

    const userExist = await prisma.user.findFirst({
      where: {
        email: LowerCaseEmail
      },
    });
    console.log(userExist , 'check userExist');
   

    if (!userExist) {
      return { error: "User not found or account is disabled" };
    }
     const res = await signIn("credentials", {
      email: userExist.email,
      password: password,
      redirect : false
    });
   console.log(res, 'check result');
   

  } catch (error){
    console.log(error , 'check error');
    return { error: "Something went wrong. Please try again."};
  }
  
  return { success: "User logged in successfully" };
};
