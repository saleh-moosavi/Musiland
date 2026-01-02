import { cookies } from "next/headers";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateToken, cookieOptions } from "@/libs/authUtils";x

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
          message: "Email already in use",
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

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        data: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
