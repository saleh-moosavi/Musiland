import { PlaylistModel } from "@/models/playlist";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const playlist = await PlaylistModel.findById(id);
    if (!playlist)
      return NextResponse.json(
        {
          success: false,
          message: "Playlist not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: playlist,
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
          message: "Playlist ID is required",
        },
        { status: 400 }
      );
    }

    const playlist = await PlaylistModel.findByIdAndDelete(id);

    if (!playlist) {
      return NextResponse.json(
        {
          success: false,
          message: "Playlist not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: playlist,
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
