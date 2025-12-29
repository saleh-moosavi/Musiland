import { CommentModel } from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const comment = await CommentModel.find({ user: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    if (!comment)
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: comment,
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
