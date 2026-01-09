import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET() {
  try {
    const users = await UserModel.find()
      .populate("likedSongs")
      .populate("comments");
    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
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
        { status: 400 }
      );
    }

    const existingEmail = await UserModel.findOne({ email });
    const existingName = await UserModel.findOne({ name });
    if (existingEmail)
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    if (existingName)
      return NextResponse.json(
        {
          success: false,
          message: "Name Must be Unique",
        },
        { status: 409 }
      );

    const user = await UserModel.create({ name, password, email });
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
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
        { status: 400 }
      );

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    if (!name || !password || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name , Email , Password are required",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
