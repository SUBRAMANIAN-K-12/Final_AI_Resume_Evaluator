import { NextResponse } from "next/server";


export async function middleware(req) {
  const token = req.cookies.get('session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const session = req.cookies.get('session')?.value;


  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};



 