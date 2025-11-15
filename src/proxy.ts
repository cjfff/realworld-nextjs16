import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {   
    const { pathname } = request.nextUrl

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-path', pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}
