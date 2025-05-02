"use server";
import { prisma } from "../../../../prisma/prisma";
import type { SignInTypeSchema } from "schemas/formSchemas";
import { SignInSchema } from "schemas/formSchemas";
import { signIn } from "@/auth";

export const loginAction = async (data: SignInTypeSchema) => {

  try {
    const validatedDate = SignInSchema.parse(data);

    const { email, password } = validatedDate;
    const LowerCaseEmail = email.toLowerCase()

    const userExist = await prisma.user.findUnique({
      where: {
        email: LowerCaseEmail,
      },
    });
    console.log(userExist);

    if (!userExist || !userExist.enabled ) {
      return { error: "User not found or account is disabled" };
    }
     const res = await signIn("credentials", {
      email: userExist.email,
      password: password,
      redirect: false,
      
    });
   
    if (res.error) {
      return { error: "Invalid email or password" };
    }


  } catch (error){
    console.log(error);
    return { error: "Something went wrong. Please try again."};
  }
  
  return { success: "User logged in successfully" };
};
