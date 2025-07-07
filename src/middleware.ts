// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Define which paths are public (don't require authentication)
    const isPublicPath = path === "/login" || path === "/admin/login";

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    // Redirect unauthenticated users to login if they're not on public paths
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // if (token) {
    //     const userType = token.user_type as string;
        
    //     // Handle admin routes
    //     if (userType?.startsWith('admin')) {
    //         if (isPublicPath) {
    //             return NextResponse.redirect(new URL("/", req.url));
    //         }
    //         if (!path.startsWith('/admin')) {
    //             return NextResponse.redirect(new URL("/admin", req.url));
    //         }
    //     } 
    //     // Handle voter routes
    //     else {
    //         if (isPublicPath) {
    //             return NextResponse.redirect(new URL("/voter", req.url));
    //         }
    //         if (!path.startsWith('/voter')) {
    //             return NextResponse.redirect(new URL("/voter", req.url));
    //         }
    //     }
    // }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        // Match all paths except _next and api
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};