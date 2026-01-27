import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Song ID is Required",
        },
        { status: 400 },
      );
    }

    const { data: song, error } = await supabase
      .from("songs")
      .select(
        `
        *,
        singer:singer_id (id, name, created_at, updated_at),
        album:album_id (id, name, created_at, updated_at),
        genres:genre_ids (id, name, created_at, updated_at),
        playlists:playlist_ids (id, name, created_at, updated_at)
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Song Not Found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: song,
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Song ID is Required",
        },
        { status: 400 },
      );
    }

    const { data: song, error } = await supabase
      .from("songs")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: song,
    });
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
