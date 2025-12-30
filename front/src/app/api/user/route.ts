import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET
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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

// ✅ Create
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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

// ✅ Update
export async function PUT(req: NextRequest) {
  try {
    const { name, password, email, id } = await req.json();

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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

// ✅ Delete
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
