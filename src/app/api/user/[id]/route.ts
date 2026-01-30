import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 },
      );
    }

    const { data, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (userError)
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 },
      );

    return NextResponse.json(
      {
        success: true,
        data,
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
          message: "ID is required",
        },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("users")
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
      data,
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
