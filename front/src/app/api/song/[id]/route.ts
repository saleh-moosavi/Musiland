import { SongModel } from "@/models/song";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const song = await SongModel.findById(id)
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists");
    return NextResponse.json(
      {
        success: true,
        data: song,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

/*---------------- API ----------------*/
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Genre ID is required",
        },
        { status: 400 }
      );
    }

    const song = await SongModel.findByIdAndDelete(id);

    if (!song) {
      return NextResponse.json(
        {
          success: false,
          message: "Song not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: song,
    });
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
