import { AlbumModel } from "@/models/album";
import { NextRequest, NextResponse } from "next/server";

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
