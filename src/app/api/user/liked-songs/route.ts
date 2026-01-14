import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId)
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );

    const user = await UserModel.findById(userId).populate({
      path: "likedSongs",
      populate: ["singer", "album", "genres", "playlists"],
      options: { sort: { createdAt: -1 } },
    });

    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 }
      );

    const likedSongs = user.likedSongs || [];
    return NextResponse.json(
      {
        success: false,
        data: likedSongs,
      },
      { status: 200 }
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
