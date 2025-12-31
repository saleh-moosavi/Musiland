import { SingerModel } from "@/models/singer";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET() {
  try {
    const singers = await SingerModel.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        data: singers,
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

    const existing = await SingerModel.findOne({ name });
    if (existing)
      return NextResponse.json(
        {
          success: false,
          message: "already exists",
        },
        { status: 409 }
      );

    const singer = await SingerModel.create({ name });
    return NextResponse.json(
      {
        success: true,
        data: singer,
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

/*---------------- API ----------------*/
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

    const singer = await SingerModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!singer) {
      return NextResponse.json(
        {
          success: false,
          message: "not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: singer,
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
