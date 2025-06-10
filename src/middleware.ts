import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./utils/routesUrl";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // GET all data from token // Use this cookieName when deploy on vercel !== local
  //Check CookieName on browser first
  
  const token = await getToken({ 
    req,
    secret: process.env.AUTH_SECRET , 
    cookieName: "__Secure-authjs.session-token", }); 

  const roleUser = token?.role;
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const url = process.env.NEXT_PUBLIC_BASE_URL as string;
  
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  const idDashBoard = nextUrl.pathname.includes("/dashboard");

  if (isApiRoute && roleUser !== "admin") {
    return Response.redirect(`${url}`);
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}`);
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${url}/auth/sign-in`);
  }

  if(isLoggedIn && idDashBoard && roleUser !== 'admin') {
    return Response.redirect(`${url}`);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
