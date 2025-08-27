import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  try {
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URLF}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json(
        { error: result?.error?.message || "Signed Up Failed" },
        { status: strapiRes.status }
      );
    }

    (await cookies()).set("token", result.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // یک هفته
    });

    return NextResponse.json({ user: result.user, jwt: result.jwt });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
