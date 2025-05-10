import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./utils/routesUrl";
import { getToken } from "next-auth/jwt";


const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // GET all data from token 
  const token = await getToken({ req , secret : process.env.AUTH_SECRET });
  const roleUser = token?.role;
 
  console.log("ROLE CHECK " , roleUser);
  
  // check user is loggin
  const isLoggedIn = !!req.auth;
  // reqquest URL
  const { nextUrl } = req;
  const url = "http://localhost:3000";
 


  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  const idDashBoard = nextUrl.pathname.includes("/dashboard");

  if (isApiRoute) {
    return;
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
  if(isLoggedIn && roleUser === 'admin') {
    return
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
