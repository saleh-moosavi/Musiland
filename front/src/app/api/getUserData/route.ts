import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userDetailsRes = await fetch(`http://localhost:1337/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!userDetailsRes.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fullUser = await userDetailsRes.json();

  return NextResponse.json({ user: fullUser });
}
