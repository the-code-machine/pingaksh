import { NextRequest, NextResponse } from "next/server";

const DIWALI_PATH = "/festive/diwali";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the Diwali campaign route to prevent redirect loops
  if (pathname === DIWALI_PATH || pathname.startsWith(`${DIWALI_PATH}/`)) {
    return NextResponse.next();
  }

  // Allow Next.js internal assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect all other routes to Diwali campaign
  const url = request.nextUrl.clone();
  url.pathname = DIWALI_PATH;

  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/:path*"],
};
