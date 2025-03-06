import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

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
  matcher: [
    "/",
    "/forms/:path*",
    "/hierarchy/:path*",
    "/reports/:path*",
    "/permissions/:path*",
  ],
};
