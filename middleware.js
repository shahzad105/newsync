import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/profile/:path*"],
};

export default async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: "__Secure-next-auth.session-token",
  });
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

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
