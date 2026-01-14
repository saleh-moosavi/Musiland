import { SongModel } from "@/models/song";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API Toggle Like ----------------*/
export async function POST(req: NextRequest) {
  try {
    const { userId, songId } = await req.json();

    if (!userId || !songId)
      return NextResponse.json(
        {
          success: false,
          message: "Missing parameters",
        },
        { status: 400 }
      );

    const [user, song] = await Promise.all([
      UserModel.findById(userId),
      SongModel.findById(songId),
    ]);

    if (!user || !song)
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 }
      );

    const isLiked = user.likedSongs.includes(songId);

    await UserModel.findByIdAndUpdate(
      userId,
      isLiked
        ? { $pull: { likedSongs: songId } }
        : { $addToSet: { likedSongs: songId } }
    );

    const newLikes = Math.max(0, song.likes + (isLiked ? -1 : 1));
    await song.updateOne({ likes: newLikes });
    return NextResponse.json(
      {
        success: true,
        data: newLikes,
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
