import { NextResponse } from "next/server";
import { SingerModel } from "@/models/singer";

export async function GET() {
  try {
    const data = await SingerModel.find({});
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
