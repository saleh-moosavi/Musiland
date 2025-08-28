import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userCookie = (await cookies()).get("user")?.value;

  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = JSON.parse(userCookie);
  return NextResponse.json({ ok: true, user });
}
