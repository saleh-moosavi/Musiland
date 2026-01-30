import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 },
      );
    }

    // Get all liked songs with relations in one query
    const { data, error } = await supabase
      .from("user_liked_songs")
      .select(
        `
        songs!inner (
          *,
          singer:singer_id (*),
          album:album_id (*),
          songs_genres!inner (
            genres!inner (*)
          ),
          songs_playlists!inner (
            playlists!inner (*)
          )
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed To Fetch Liked Songs",
        },
        { status: 500 },
      );

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
