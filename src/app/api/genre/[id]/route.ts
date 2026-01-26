import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { data: genre, error } = await supabase
      .from("genres")
      .select("*")
      .eq("id", id)
      .single();

    if (error)
      return NextResponse.json(
        {
          success: false,
          message: "Genre not found",
        },
        { status: 404 },
      );

    return NextResponse.json(
      {
        success: true,
        data: genre,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
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
          message: "Genre ID is required",
        },
        { status: 400 },
      );
    }

    const { data: genre, error } = await supabase
      .from("genres")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Genre not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: genre,
    });
  } catch (error: unknown) {
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
