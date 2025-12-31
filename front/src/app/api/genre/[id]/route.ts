import { GenreModel } from "@/models/genre";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const genre = await GenreModel.findById(id);
    if (!genre)
      return NextResponse.json(
        {
          success: false,
          message: "Genre not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: genre,
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
          message: "Genre ID is required",
        },
        { status: 400 }
      );
    }

    const genre = await GenreModel.findByIdAndDelete(id);

    if (!genre) {
      return NextResponse.json(
        {
          success: false,
          message: "Genre not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: genre,
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
