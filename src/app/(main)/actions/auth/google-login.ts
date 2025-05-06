'use server'
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const googleAuth = async () => {
    try {
        await signIn('google');
      
    } catch (error) {
        if(error instanceof AuthError){
            return 'Google login failed'
        }
        throw error;
    }
    
}


