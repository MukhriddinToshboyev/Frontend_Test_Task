import { NextRequest, NextResponse } from "next/server";


const PUBLIC_ROUTES = ["/login"];



export const middleware = (request: NextRequest) =>{
   const token = request.cookies.get("accessToken")?.value;
   const { pathname} = request.nextUrl;
   console.log("Middleware ishladi!", pathname)
   
   const isPublic = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
    );
   
    // login qilmagan user boshqa sahifaga otmoqchi bolsa loginga otkazish 
    if(!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
    };

    // user login qilingan bolsa va token bolsa dashboarda otkazish
    if( token && isPublic) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    };

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};