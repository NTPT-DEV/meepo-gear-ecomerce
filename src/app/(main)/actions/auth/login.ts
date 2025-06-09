"use server";

import type { SignInTypeSchema } from "schemas/formSchemas";
import { SignInSchema } from "schemas/formSchemas";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";


export const loginAction = async (data: SignInTypeSchema) => {

  try {
    const validatedDate = SignInSchema.parse(data);
    const { email, password } = validatedDate;
    const LowerCaseEmail = email.toLowerCase();

    const userExist = await prisma.user.findFirst({
      where: {
        email: LowerCaseEmail,
      },
    });

    if (userExist?.statusUser === false) {
      return { messageError: "Account is disabled from admin" };
    }

    if (!userExist) {
      return { messageError: "User not found" };
    }
    const result = await signIn("credentials", {
      email: userExist.email,
      password: password,
      redirect: false,
    });

    // return Status from Auth js
    if (result?.error === "CredentialsSignin") {
      return { messageError: "Email or Password is incorrect" };
    }
  } catch (error) {
    console.log(error, "check error");
    return { error: "Something went wrong. Please try again." };
  }

  return { success: "User logged in successfully" };
};
