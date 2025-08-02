import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/user-dashboard')) {
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;
        const isVerified = request.cookies.get('isVerified')?.value;
        console.log("accessToken=", accessToken, "refreshToken== ", refreshToken, "isVerified==", isVerified)
        if (!accessToken || !refreshToken || isVerified !== 'true') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user-dashboard/:path*'],
};
