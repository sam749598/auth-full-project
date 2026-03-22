import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AuthPayload } from "@/types";




// ─── Protected Routes ─────//
const protectedRoutes = ["/profile", "/admin"];
const adminRoutes = ["/admin"];
const authRoutes = ["/login", "/register"];


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ─── No Token ──────//
  if (!token) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // ─── Decode Token ─────//
  try {
    const decoded = jwtDecode<AuthPayload>(token);
    const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;

    // Token expired
    if (isExpired) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }

    // ─── Admin Route Protection ──────//
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    }

    // ─── Already Logged In ─────//
    if (authRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*", "/login", "/register"],
}