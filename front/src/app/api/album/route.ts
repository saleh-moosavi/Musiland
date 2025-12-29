import { AlbumModel } from "@/models/album";
import { NextRequest, NextResponse } from "next/server";

// ✅ Get all albums
export async function GET() {
  try {
    const albums = await AlbumModel.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        data: albums,
      },
      { status: 200 }
    );
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

// ✅ Create new album
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

    const existing = await AlbumModel.findOne({ name });
    if (existing)
      return NextResponse.json(
        {
          success: false,
          message: "Album already exists",
        },
        { status: 409 }
      );

    const album = await AlbumModel.create({ name });
    return NextResponse.json(
      {
        success: true,
        data: album,
      },
      { status: 201 }
    );
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

// ✅ Update album
export async function PUT(req: NextRequest) {
  try {
    const { name, id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
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

    const album = await AlbumModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!album) {
      return NextResponse.json(
        {
          success: false,
          message: "album not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: album,
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

// ✅ Delete album
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Album ID is required",
        },
        { status: 400 }
      );
    }

    const album = await AlbumModel.findByIdAndDelete(id);

    if (!album) {
      return NextResponse.json(
        {
          success: false,
          message: "Album not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: album,
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
