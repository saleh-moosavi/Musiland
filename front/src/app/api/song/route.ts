import { SongModel } from "@/models/song";
import { SongFormData } from "@/types/song";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const songs = await SongModel.find();
    return NextResponse.json(
      {
        success: true,
        data: songs,
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

export async function POST(req: NextRequest) {
  try {
    const data: SongFormData = await req.json();

    if (
      data.name.trim() === "" ||
      data.coverUrl.trim() === "" ||
      data.audioUrl.trim() === "" ||
      data.albumId === "" ||
      data.genreIds.length < 1 ||
      data.playlistIds.length < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "all Data are required",
        },
        { status: 400 }
      );
    }
    const existingSong = await SongModel.findOne({ ...data });
    if (existingSong) {
      return NextResponse.json(
        {
          success: false,
          message: "already exists",
        },
        { status: 400 }
      );
    }
    const song = await SongModel.create({ ...data });

    return NextResponse.json(
      {
        success: true,
        data: song,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating song:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { data, id }: { data: SongFormData; id: string } = await req.json();

    if (
      data.name.trim() === "" ||
      data.coverUrl.trim() === "" ||
      data.audioUrl.trim() === "" ||
      data.albumId === "" ||
      data.genreIds.length < 1 ||
      data.playlistIds.length < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "all data are required",
        },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "id is required",
        },
        { status: 400 }
      );
    }

    const song = await SongModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );

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
    console.error("Error updating Song:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
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
