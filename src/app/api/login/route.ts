import { cookies } from "next/headers";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword, generateToken, cookieOptions } from "@/libs/authUtils";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 }
      );
    }

    // Is Super Admin
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create admin token
      const token = generateToken({
        userId: 'admin',
        email: email,
        role: 'admin'
      });

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('user', token, cookieOptions);

      return NextResponse.json(
        {
          success: true,
          user: {
            id: 'admin',
            name: "Admin Name",
            email: email,
            role: "admin",
          },
        },
        { status: 200 }
      );
    }

    // Find User
    const user = await UserModel.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role || 'user'
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('user', token, cookieOptions);

    // Remove password from response
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role || 'user',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json(
      {
        success: true,
        data: userResponse,
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}