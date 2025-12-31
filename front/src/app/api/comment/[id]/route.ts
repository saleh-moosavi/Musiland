import { CommentModel } from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

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
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const comment = await CommentModel.findByIdAndDelete(id);

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
