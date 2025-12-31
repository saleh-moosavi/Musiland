import { SongModel } from "@/models/song";
import { SongFormData } from "@/types/song";
import { AlbumModel } from "@/models/album";
import { GenreModel } from "@/models/genre";
import { SingerModel } from "@/models/singer";
import { PlaylistModel } from "@/models/playlist";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const likes = searchParams.get("likes");
  const album = searchParams.get("album");
  const genre = searchParams.get("genre");
  const singer = searchParams.get("singer");
  const playlist = searchParams.get("playlist");
  const query: any = {};
  if (likes) query.likes = { $gt: Number(likes) };
  if (name) query.name = { $regex: name, $options: "i" };

  // filter by Singer
  if (singer) {
    const singers = await SingerModel.find({
      name: { $regex: singer, $options: "i" },
    }).select("_id");
    if (singers.length) query.singer = { $in: singers.map((s) => s._id) };
  }

  // filter by Album
  if (album) {
    const albums = await AlbumModel.find({
      name: { $regex: album, $options: "i" },
    }).select("_id");
    if (albums.length) query.album = { $in: albums.map((a) => a._id) };
  }

  // filter by Genre
  if (genre) {
    const genreNames = genre.split(",").map((g) => g.trim());
    const foundGenres = await GenreModel.find({
      name: { $in: genreNames.map((g) => new RegExp(`^${g}$`, "i")) },
    });
    if (foundGenres.length === 0) {
      return NextResponse.json(
        { message: "No genres found", ok: false },
        { status: 404 }
      );
    }
    query.genres = { $in: foundGenres.map((g) => g._id) };
  }

  // filter by Playlist
  if (playlist) {
    const playlistNames = playlist.split(",").map((p) => p.trim());
    const foundPlaylists = await PlaylistModel.find({
      name: { $in: playlistNames.map((p) => new RegExp(`^${p}$`, "i")) },
    });
    if (foundPlaylists.length === 0) {
      return NextResponse.json(
        { message: "No playlist found", ok: false },
        { status: 404 }
      );
    }
    query.playlists = { $in: foundPlaylists.map((p) => p._id) };
  }

  // Sorting
  let sortOption: any = {};
  if (sort) {
    const [field, order] = sort.split(",");
    const sortField = field === "date" ? "createdAt" : field;
    sortOption[sortField] = order === "dec" ? -1 : 1;
  }

  // Pagination
  let skip = 0;
  let limit = 10;
  if (page) {
    const [pageNum, perPage] = page.split(",").map(Number);
    skip = (pageNum - 1) * perPage;
    limit = perPage;
  }

  //Get filtered Songs
  try {
    const songs = await SongModel.find(query)
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    return NextResponse.json(
      {
        success: true,
        data: songs,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

/*---------------- API ----------------*/
export async function POST(req: NextRequest) {
  try {
    const data: SongFormData = await req.json();

    if (
      data.name.trim() === "" ||
      data.coverUrl.trim() === "" ||
      data.audioUrl.trim() === "" ||
      data.albumId === "" ||
      data.singerId === "" ||
      data.genreIds.length < 1 ||
      data.playlistIds.length < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "all Data are required",
        },
        { status: 400 }
      );
    }
    const existingSong = await SongModel.findOne({ ...data });
    if (existingSong) {
      return NextResponse.json(
        {
          success: false,
          message: "already exists",
        },
        { status: 400 }
      );
    }
    const song = await SongModel.create({ ...data });

    return NextResponse.json(
      {
        success: true,
        data: song,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating song:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

/*---------------- API ----------------*/
export async function PUT(req: NextRequest) {
  try {
    const { data, id }: { data: SongFormData; id: string } = await req.json();

    if (
      data.name.trim() === "" ||
      data.coverUrl.trim() === "" ||
      data.audioUrl.trim() === "" ||
      data.albumId === "" ||
      data.genreIds.length < 1 ||
      data.playlistIds.length < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "all data are required",
        },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "id is required",
        },
        { status: 400 }
      );
    }

    const song = await SongModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    )
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists");

    if (!song) {
      return NextResponse.json(
        {
          success: false,
          message: "Song not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: song,
    });
  } catch (error: any) {
    console.error("Error updating Song:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
