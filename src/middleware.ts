import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./utils/routesUrl";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // GET all data from token 
  const token = await getToken({ req , secret : process.env.AUTH_SECRET });
  const roleUser = token?.role;

    // Log the AUTH_SECRET being used (partially for security)
  console.log(`[MIDDLEWARE] AUTH_SECRET on server: ${process.env.AUTH_SECRET ? `Exists, length: ${process.env.AUTH_SECRET.length}` : 'NOT SET or empty'}`);
  if (process.env.AUTH_SECRET && process.env.AUTH_SECRET.length < 32) {
    console.warn("[MIDDLEWARE] AUTH_SECRET is set but might be too short for production security.");
  }

  

  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;
  const url = process.env.NEXT_PUBLIC_BASE_URL as string;

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  // const idDashBoard = nextUrl.pathname.includes("/dashboard");

  if (isApiRoute && roleUser !== 'admin') {
    return Response.redirect(`${url}`);
  }
  console.log(url , 'This is Url');
  console.log(roleUser , 'This is roleUser');
  console.log(isLoggedIn , 'This is isLoggedIn');

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}`);
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${url}/auth/sign-in`);
  }

  // if(isLoggedIn && idDashBoard && roleUser !== 'admin') {
  //   return Response.redirect(`${url}`);
  // }

});



export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
