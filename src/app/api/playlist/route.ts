import { PlaylistModel } from "@/models/playlist";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET() {
  try {
    const playlists = await PlaylistModel.find();
    return NextResponse.json(
      {
        success: true,
        data: playlists,
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
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 }
      );
    }
    const existingPlaylist = await PlaylistModel.findOne({ name });
    if (existingPlaylist) {
      return NextResponse.json(
        {
          success: false,
          message: "Playlist already exists",
        },
        { status: 400 }
      );
    }
    const playlist = await PlaylistModel.create({ name });

    return NextResponse.json(
      {
        success: true,
        data: playlist,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating playlist:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

/*---------------- API ----------------*/
export async function PUT(req: NextRequest) {
  try {
    const { name, id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Playlist ID is required",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 }
      );
    }

    const playlist = await PlaylistModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

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
    console.error("Error updating Playlist:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

