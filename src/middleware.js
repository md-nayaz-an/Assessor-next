import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        
        const path = req.nextUrl.pathname;
        const token = req.nextauth.token;
        
        if(path.startsWith('/api')) {
            console.log(path);
            return;
        }

        if(path.startsWith('/admin') && token.userData?.role !== "admin")
            return NextResponse.redirect(new URL('/client', req.url));

        if(!path.startsWith("/client/") && path !== "/client" && token.userData?.role === "client")
            return NextResponse.redirect(new URL("/client", req.url));

        if(token.userData?.role === "client" && (
            !token.userData?.age ||
            !token.userData?.gender ||
            !token.userData?.phone
        ))
            return NextResponse.redirect(new URL("/client/profile", req.url))
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)
//65bfb0655973fb8a9e963a5b
export const config = { matcher: ["/", "/admin/:path*", "/client", "/api/:path*"] };
