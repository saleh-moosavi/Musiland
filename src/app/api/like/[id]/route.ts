import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id)
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );

    const user = await UserModel.findById(id).populate({
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
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
