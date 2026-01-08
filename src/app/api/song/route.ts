import { SortOrder } from "mongoose";
import { AlbumModel } from "@/models/album";
import { GenreModel } from "@/models/genre";
import { SingerModel } from "@/models/singer";
import { PlaylistModel } from "@/models/playlist";
import { NextRequest, NextResponse } from "next/server";
import { SongFormData, SongModel } from "@/models/song";

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
  const query: Record<string, Record<string, string | number | string[]>> = {};
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
    query.genre = { $in: foundGenres.map((g) => g._id) };
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
    query.playlist = { $in: foundPlaylists.map((p) => p._id) };
  }

  // Sorting
  const sortOption:
    | string
    | Record<string, SortOrder | { $meta: string | number }>
    | [string, SortOrder][]
    | null
    | undefined = {};
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
      .populate("genre")
      .populate("playlist")
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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error?.message : "Unknown error",
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
      data.album === "" ||
      data.singer === "" ||
      data.genre.length < 1 ||
      data.playlist.length < 1
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
    const song = await SongModel.create({
      name: data.name,
      likes: 0,
      lyric: data.lyric,
      audioUrl: data.audioUrl,
      coverUrl: data.coverUrl,
      singer: data.singer,
      album: data.album,
      genre: data.genre,
      playlist: data.playlist,
    });

    return NextResponse.json(
      {
        success: true,
        data: song,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error?.message : "Internal server error",
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
      data.album === "" ||
      data.genre.length < 1 ||
      data.playlist.length < 1
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
      .populate("genre")
      .populate("playlist");

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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error?.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
