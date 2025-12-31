import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result?.error || "Register Failed",
        },
        { status: result.status }
      );
    }

    (await cookies()).set("user", JSON.stringify(result.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
