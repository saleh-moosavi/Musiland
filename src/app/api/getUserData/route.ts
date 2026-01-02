import { GetSong } from "@/types/song";
import { cookies } from "next/headers";
import { UserModel } from "@/models/user";
import { NextResponse } from "next/server";
import { verifyToken } from "@/libs/authUtils";

export async function GET(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const includeLikes = urlObj.searchParams.get("like");

    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("user")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 401 }
      );
    }

    // Get user from database (excluding password)
    let user;

    if (decoded.userId === "admin") {
      // Admin user
      user = {
        id: "admin",
        name: "Admin Name",
        email: decoded.email,
        role: "admin",
      };
    } else {
      // Regular user
      user = await UserModel.findById(decoded.userId).select("-password");

      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      // Convert to plain object
      user = user.toObject();

      // Add liked songs if requested
      if (includeLikes) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${user._id}`
        );

        if (res.success) {
          const userLikes = res.likedSongs?.map((item: GetSong) => item._id);
          user.likedSongs = userLikes;
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        id: user._id || user.id,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
