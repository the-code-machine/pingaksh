import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Routes to restrict
  const blockedRoutes = [
    "/media/press-releases",
    "/media/certifications-awards",
    "/investors",
  ];

  // Redirect if route matches or is a nested page
  const isBlocked = blockedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isBlocked) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/media/press-releases/:path*",
    "/media/certifications-awards/:path*",
    "/investors/:path*",
  ],
};
