import { GetSong } from "@/types/song";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const urlObj = new URL(request.url);
  const includeLikes = urlObj.searchParams.get("like");
  const userCookie = (await cookies()).get("user")?.value;

  if (!userCookie) {
    return NextResponse.json(
      { error: "Unauthorized", ok: false },
      { status: 401 }
    );
  }

  const user = await JSON.parse(userCookie);
  if (includeLikes) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`
    );
    const data = await res.json();
    const userLikes = data.likedSongs?.map((item: GetSong) => item._id);
    user["likedSongs"] = userLikes;
  }
  return NextResponse.json({ ok: true, user });
}
