import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cookieOptions } from "@/libs/authUtils";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Clear cookie
    cookieStore.set("user", "", {
      ...cookieOptions,
      maxAge: 0, // Expire immediately
    });

    return NextResponse.json({
      ok: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { ok: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
