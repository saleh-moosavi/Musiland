import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  if (!email || !password || !username) {
    return NextResponse.json(
      {
        success: false,
        message: "Username , Email and Password are required",
      },
      { status: 400 }
    );
  }
  // Is Existed
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Email already in use",
      },
      { status: 400 }
    );
  }

  try {
    // Create User
    const user = await UserModel.create({
      username,
      email,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
