import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { data: album, error } = await supabase
      .from("albums")
      .select("*")
      .eq("id", id)
      .single();

    if (error)
      return NextResponse.json(
        {
          success: false,
          message: "Album not found",
        },
        { status: 404 },
      );

    return NextResponse.json(
      {
        success: true,
        data: album,
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
          message: "Album ID is required",
        },
        { status: 400 },
      );
    }

    const { data: album, error } = await supabase
      .from("albums")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Album not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: album,
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
