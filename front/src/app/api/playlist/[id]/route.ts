import { NextResponse } from "next/server";
import { PlaylistModel } from "@/models/playlist";

export async function GET({ params }: { params: { id: string } }) {
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
