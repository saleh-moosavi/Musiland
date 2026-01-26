import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const sortBy = searchParams.get("sort");
    const order = searchParams.get("order");
    const page = searchParams.get("page");
    const limit = searchParams.get("skip") || "10";

    let result = supabase.from("genres").select("*");
    if (name) {
      result = result.eq("name", name);
    }
    if (sortBy) {
      result = result.order(sortBy, { ascending: order === "asc" });
    }
    if (page) {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      result = result.range(offset, offset + parseInt(limit) - 1);
    }

    const genres = await result;
    return NextResponse.json(
      {
        success: true,
        data: genres,
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
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 },
      );
    }

    const existingResult = await supabase
      .from("genres")
      .select("*")
      .eq("name", name);
    if (existingResult.data && existingResult.data.length > 0)
      return NextResponse.json(
        {
          success: false,
          message: "Genre already exists",
        },
        { status: 409 },
      );

    const now = new Date().toISOString();
    const insertData = {
      name,
      created_at: now,
      updated_at: now,
    };
    const { data: genre, error } = await supabase
      .from("genres")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create Genre",
        },
        { status: 402 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: genre,
      },
      { status: 201 },
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
export async function PUT(req: NextRequest) {
  try {
    const { name, id } = await req.json();

    if (!id || !name) {
      return NextResponse.json(
        {
          success: false,
          message: "ID and name are required",
        },
        { status: 400 },
      );
    }

    const { data: genre, error } = await supabase
      .from("genres")
      .update({ name, updated_at: new Date().toISOString() })
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
