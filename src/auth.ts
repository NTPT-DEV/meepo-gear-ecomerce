import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { Prisma } from "@prisma/client"


 
export const { auth, handlers , signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  session: { strategy: "jwt" },
  ...authConfig
  
})