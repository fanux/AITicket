import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/callback";
  
  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is logged in and trying to access a public path, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if (!isPublicPath && !token) {
    // If user is not logged in and trying to access a protected path, redirect to homepage
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/", "/callback", "/dashboard/:path*"],
};
