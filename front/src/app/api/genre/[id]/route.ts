import { NextResponse } from "next/server";
import { GenreModel } from "@/models/genre";

export async function GET({ params }: { params: { id: string } }) {
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
