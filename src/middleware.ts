import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const cookie = req.cookies.get("user")?.value;

  // if (!cookie) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // const user = JSON.parse(cookie);

  // const adminPaths = ["/admin", "/dashboard"];

  // if (adminPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
  //   if (user.role === "user") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/profile/:path*", "/admin/dashboard/:path*"],
// };
