import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).delete("token");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
