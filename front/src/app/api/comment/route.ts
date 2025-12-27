import { NextResponse } from "next/server";
import { CommentModel } from "@/models/comment";

export async function GET() {
  try {
    const data = await CommentModel.find({});
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
