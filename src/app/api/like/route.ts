import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit") || "20";

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId is required",
        },
        { status: 400 },
      );
    }

    let query = supabase
      .from("user_liked_songs")
      .select(
        `
        *,
        song:songs(*)
      `,
      )
      .eq("user_id", userId);

    // Add pagination
    if (page) {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      query = query.range(offset, offset + parseInt(limit) - 1);
    }

    // Order by created_at descending (newest first)
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data.map((item) => item.song),
        count: data.length,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

/*---------------- API ----------------*/
export async function POST(req: NextRequest) {
  try {
    const { userId, songId } = await req.json();

    if (!userId || !songId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId and songId are required",
        },
        { status: 400 },
      );
    }

    // Check if already liked
    const { data: existingLike, error: checkError } = await supabase
      .from("user_liked_songs")
      .select("*")
      .eq("user_id", userId)
      .eq("song_id", songId)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        {
          success: false,
          message: checkError.message,
        },
        { status: 400 },
      );
    }

    let result;
    let likesChange = 0;

    if (existingLike) {
      // Unlike: Remove from liked songs
      const { error: deleteError } = await supabase
        .from("user_liked_songs")
        .delete()
        .eq("user_id", userId)
        .eq("song_id", songId);

      if (deleteError) {
        return NextResponse.json(
          {
            success: false,
            message: deleteError.message,
          },
          { status: 400 },
        );
      }
      likesChange = -1;
      result = { action: "unliked" };
    } else {
      // Like: Add to liked songs
      const { error: insertError } = await supabase
        .from("user_liked_songs")
        .insert([
          {
            user_id: userId,
            song_id: songId,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        return NextResponse.json(
          {
            success: false,
            message: insertError.message,
          },
          { status: 400 },
        );
      }
      likesChange = 1;
      result = { action: "liked" };
    }

    // Update song's likes count
    const { data: song, error: updateError } = await supabase
      .from("songs")
      .select("likes")
      .eq("id", songId)
      .single();

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          message: updateError.message,
        },
        { status: 400 },
      );
    }

    const newLikesCount = (song.likes || 0) + likesChange;

    const { error: songUpdateError } = await supabase
      .from("songs")
      .update({
        likes: newLikesCount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", songId);

    if (songUpdateError) {
      return NextResponse.json(
        {
          success: false,
          message: songUpdateError.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...result,
          likes: newLikesCount,
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
