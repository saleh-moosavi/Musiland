import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json(
        {
          success: false,
          message: "Fetch Error",
        },
        { status: 401 },
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
export async function POST(req: NextRequest) {
  try {
    const { name, password, email } = await req.json();

    if (!name || !password || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name , Email , Password are required",
        },
        { status: 400 },
      );
    }

    const { data: existingEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingEmail)
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 },
      );

    const { data, error: createError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          role: "user",
        },
      ])
      .select()
      .single();

    if (createError)
      return NextResponse.json(
        {
          success: false,
          message: "Failed To Add User",
        },
        { status: 401 },
      );

    return NextResponse.json(
      {
        success: true,
        data,
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
    const { name, password, email, id, role } = await req.json();

    if (!role || !["admin", "user", "manager"].includes(role))
      return NextResponse.json(
        {
          success: false,
          message: "Valid role required",
        },
        { status: 400 },
      );

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 },
      );
    }

    if (!name || !password || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name , Email , Password are required",
        },
        { status: 400 },
      );
    }

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (checkError || !existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 },
      );
    }

    const { data, error: updateError } = await supabase
      .from("users")
      .update({
        name,
        email,
        password,
        role: role || existingUser.role,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed To Update",
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
