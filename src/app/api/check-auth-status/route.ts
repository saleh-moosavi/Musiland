import { cookies } from "next/headers";
import { UserModel } from "@/models/user";
import { NextResponse } from "next/server";
import { verifyToken } from "@/libs/authUtils";

export async function GET() {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("user")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "User is Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: "Token Is Invalid", success: false },
        { status: 401 }
      );
    }

    // Get user from database (excluding password)
    let user;

    if (decoded.userId === "admin") {
      // Admin user
      user = {
        id: "admin",
        name: "admin",
        email: decoded.email,
        role: "admin",
      };
    } else {
      // Regular user
      user = await UserModel.findById(decoded.userId).select("-password");

      if (!user) {
        return NextResponse.json(
          { message: "Not Found", success: false },
          { status: 404 }
        );
      }

      // Convert to plain object
      user = user.toObject();
    }

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        id: user._id || user.id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
