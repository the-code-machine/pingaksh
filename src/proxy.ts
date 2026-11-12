import { NextRequest, NextResponse } from "next/server";

// Overview pages → First child route
const overviewRedirects: Record<string, string> = {
  "/who-we-are": "/who-we-are/heritage-timeline",
  "/our-businesses": "/our-businesses/hydro-power",
  "/sustainability": "/sustainability/carbon-dashboard",
  "/contact": "/contact/offices",
  "/media": "/media/project-gallery",
};

// Routes that users cannot access directly
const blockedRoutes = [
  "/media/press-releases",
  "/media/certifications-awards",
  "/investors",
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect overview pages to their first child route
  const redirectTo = overviewRedirects[pathname];

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url), 307);
  }

  // Redirect restricted routes and all nested pages to homepage
  const isBlocked = blockedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isBlocked) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/who-we-are",
    "/our-businesses",
    "/sustainability",
    "/contact",
    "/media",
    "/media/press-releases/:path*",
    "/media/certifications-awards/:path*",
    "/investors/:path*",
  ],
};
