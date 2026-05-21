import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TOKEN = "lemini_admin_2024";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes: login page, auth APIs, and all other API routes (User app calls these)
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin-session")?.value;
  if (token !== SESSION_TOKEN) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads).*)"],
};
