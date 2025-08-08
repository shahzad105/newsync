import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/profile/:path*"], // watch both dashboard and auth
};

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If logged-in user tries to visit /auth/*!)
  if (!token && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Protect /dashboard routes for only logged-in admins
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (!token.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
