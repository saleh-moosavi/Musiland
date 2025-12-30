import { SingerModel } from "@/models/singer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const singer = await SingerModel.findById(id);
    if (!singer)
      return NextResponse.json(
        {
          success: false,
          message: "not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: singer,
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

// ✅ Delete Singer
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
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const singer = await SingerModel.findByIdAndDelete(id);

    if (!singer) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
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
