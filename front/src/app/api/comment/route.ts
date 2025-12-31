import { CommentModel } from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET() {
  try {
    const comments = await CommentModel.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        data: comments,
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
    const { description, user, song } = await req.json();
    if (!description || !user || !song) {
      return NextResponse.json(
        {
          success: false,
          message: "Description, user, song are required",
        },
        { status: 400 }
      );
    }

    const comment = await CommentModel.create({ description, user, song });
    return NextResponse.json(
      {
        success: true,
        data: comment,
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
    const { description, user, song, id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    if (!description || !user || !song) {
      return NextResponse.json(
        {
          success: false,
          message: "description , user , song are required",
        },
        { status: 400 }
      );
    }

    const comment = await CommentModel.findByIdAndUpdate(
      id,
      { description, user, song },
      { new: true }
    );

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          message: "comment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: comment,
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
