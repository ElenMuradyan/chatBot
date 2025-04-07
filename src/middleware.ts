import { NextRequest, NextResponse } from "next/server";
import { ROUTE_PATHS } from "./utilis/constants";

export default function authMiddleware(request: NextRequest){
    const isAuth = request.cookies.get('isAuth')?.value === 'true';
    const notAuthProtectedUrls = [ ROUTE_PATHS.FUNCTIONS ];
    const authProtectedUrls = [ ROUTE_PATHS.SIGN_IN, ROUTE_PATHS.SIGN_UP];

    if(!isAuth && notAuthProtectedUrls.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL(ROUTE_PATHS.SIGN_IN, request.url));
    };

    if(isAuth && authProtectedUrls.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL(ROUTE_PATHS.HOME, request.url));
    };

    return NextResponse.next();
}