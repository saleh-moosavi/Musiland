import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await UserModel.findById(id);
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: user,
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
