import { SongModel } from "@/models/song";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await SongModel.find({});
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
