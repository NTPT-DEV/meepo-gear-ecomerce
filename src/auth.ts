import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { getUserById } from "./app/(main)/actions/data/user";
import { getAccountByUserId } from "./app/(main)/actions/data/account";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      if (!user.id) return false;
      const existingUser = await getUserById(user.id ?? "");

      if (!existingUser) return false;

      return true;
    },
    async jwt({ token  }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      
      if (!existingUser) return token;
      
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.id = existingUser.id;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.statusUser = existingUser.statusUser;

      
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
          role : token.role, 
          statusUser : token.statusUser
          
        },
      };
    },
  },
});
