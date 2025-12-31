import { GenreModel } from "@/models/genre";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET() {
  try {
    const genres = await GenreModel.find();
    return NextResponse.json(
      {
        success: true,
        data: genres,
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
    const existingGenre = await GenreModel.findOne({ name });
    if (existingGenre) {
      return NextResponse.json(
        {
          success: false,
          message: "Genre already exists",
        },
        { status: 400 }
      );
    }
    const genre = await GenreModel.create({ name });

    return NextResponse.json(
      {
        success: true,
        data: genre,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating genre:", error);
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
          message: "Genre ID is required",
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

    const genre = await GenreModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

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
    console.error("Error updating genre:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
