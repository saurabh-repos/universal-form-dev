import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = getCookie("token"); // Assuming you store the token in cookies

  console.log("token", token);
  console.log("in the middleware");

  const { pathname } = req.nextUrl;
  console.log('pathname:', pathname)

  // Allow access to login and signup pages without authentication
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    return NextResponse.next();
  }

  if (!token) {
    // Redirect only when accessing protected routes
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  



  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/forms", "/hierarchy", "/reports", "/permissions"],
};
