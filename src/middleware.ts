import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./utils/routesUrl";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const url = 'http://localhost:3000';
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  if (isApiRoute) {
    return;
  }

  if(isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/dashboard`);
  }
  if(isAuthRoute && !isLoggedIn) {
    return;
  }
  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${url}/auth/sign-in`);
  }

});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
