import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).delete("user");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
