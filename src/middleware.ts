import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // GET all data from token // Use this cookieName when deploy on vercel !== local
  //Check CookieName on browser first
  
  const token = await getToken({ 
    req,
    secret: process.env.AUTH_SECRET , 
     cookieName: process.env.NODE_ENV === "production" ? 
     "__Secure-authjs.session-token" : "authjs.session-token"          
  }); 

  const roleUser = token?.role;
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
  

  const isAuthPage = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  const isDashBoard = nextUrl.pathname.includes("/dashboard");
  
  if (isLoggedIn && isAuthPage) {
    return Response.redirect(`${baseUrl}`);
  }

  if (!isLoggedIn && isApiRoute || isLoggedIn && isApiRoute && roleUser !== "admin") {
    return Response.redirect(`${baseUrl}`);
  }

  if (!isLoggedIn && isDashBoard ) {
    return Response.redirect(`${baseUrl}/auth/sign-in`);
  }

  if (isLoggedIn && isDashBoard && roleUser !== "admin") {
    return Response.redirect(`${baseUrl}`);
  }

  if(isDashBoard && roleUser !== 'admin') {
    return Response.redirect(`${baseUrl}`);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
