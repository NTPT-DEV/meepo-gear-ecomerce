import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt"; 

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
      isOauth?: boolean;
      statusUser? : boolean
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    email?: string;
    role?: string;
    isOauth?: boolean;
  }
}
