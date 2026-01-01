import { AlbumModel } from "@/models/album";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const album = await AlbumModel.findById(id);
    if (!album)
      return NextResponse.json(
        {
          success: false,
          message: "Album not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: album,
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
