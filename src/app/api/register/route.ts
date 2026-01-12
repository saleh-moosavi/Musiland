import { cookies } from "next/headers";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateToken, cookieOptions } from "@/libs/authUtils";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          message: "name, Email and Password are required",
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email Already in Use",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create User
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("user", token, cookieOptions);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
