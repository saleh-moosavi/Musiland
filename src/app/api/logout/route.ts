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
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server Error",
      },
      { status: 500 }
    );
  }
}
