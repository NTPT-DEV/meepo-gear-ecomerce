import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./utils/routesUrl";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // GET all data from token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const roleUser = token?.role;

  const testAuthSecretCheck  = process.env.AUTH_SECRET
  const testAuthSecretCheckv2  = process.env.AUTH_SECRET!

  console.log(testAuthSecretCheck, "This is testAuthSecretCheck") 
  console.log(typeof testAuthSecretCheck, "This is testAuthSecretCheck Type") 
  console.log(typeof testAuthSecretCheckv2, "This is testAuthSecretCheck V2 Type") 

  

  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;
  const url = process.env.NEXT_PUBLIC_BASE_URL as string;

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  // const idDashBoard = nextUrl.pathname.includes("/dashboard");

  if (isApiRoute && roleUser !== "admin") {
    return Response.redirect(`${url}`);
  }
  console.log(url, "This is Url");
  console.log(roleUser, "This is roleUser");
  console.log(token, "This is token");
  console.log(isLoggedIn, "This is isLoggedIn");

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
