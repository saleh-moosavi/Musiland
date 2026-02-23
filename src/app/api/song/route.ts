import { supabase } from "@/libs/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/*---------------- API ----------------*/
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const sort = searchParams.get("sort");
    const page = searchParams.get("page");
    const likes = searchParams.get("likes");
    const album = searchParams.get("album");
    const genre = searchParams.get("genre");
    const singer = searchParams.get("singer");
    const playlist = searchParams.get("playlist");

    // Build base query with joins using junction tables
    let query = supabase.from("songs").select(`
        *,
        singer:singer_id (id, name, created_at, updated_at),
        album:album_id (id, name, created_at, updated_at),
        songs_genres!inner (genre:genres (id, name, created_at, updated_at)),
        songs_playlists!inner (playlist:playlists (id, name, created_at, updated_at))
      `);

    // Filter by song name (search - case insensitive)
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    // Filter by minimum likes
    if (likes) {
      query = query.gt("likes", parseInt(likes));
    }

    // Filter by exact singer ID
    if (singer) {
      query = query.eq("singer_id", singer);
    }

    // Filter by exact album ID
    if (album) {
      query = query.eq("album_id", album);
    }

    // Filter by exact genre ID(s)
    if (genre) {
      const genreIds = genre.split(",").map((g) => g.trim());
      // Filter songs that have ANY of the specified genres
      query = query.in("songs_genres.genre_id", genreIds);
    }

    // Filter by exact playlist ID(s)
    if (playlist) {
      const playlistIds = playlist.split(",").map((p) => p.trim());
      // Filter songs that have ANY of the specified playlists
      query = query.in("songs_playlists.playlist_id", playlistIds);
    }

    // Apply sorting
    if (sort) {
      const [field, order] = sort.split(",");

      let sortField: string;
      let ascending: boolean;

      switch (field) {
        case "date":
          sortField = "created_at";
          ascending = order !== "dec";
          break;
        case "likes":
          sortField = "likes";
          ascending = order !== "dec";
          break;
        case "name":
          sortField = "name";
          ascending = order !== "dec";
          break;
        default:
          sortField = "created_at";
          ascending = false;
      }

      query = query.order(sortField, { ascending });
    } else {
      // Default sort by created_at desc
      query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    let skip = 0;
    let limit = 10;

    if (page) {
      // Parse page parameter (format: "page=1,10")
      const [pageNum, perPage] = page.split(",").map(Number);
      skip = (pageNum - 1) * perPage;
      limit = perPage;
      query = query.range(skip, skip + limit - 1);
    } else {
      // Default limit
      query = query.limit(limit);
    }

    // Execute query
    const { data: songs, error } = await query;

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message ?? "Failed to fetch Songs",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: songs,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

/*---------------- API ----------------*/
export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    if (
      data?.name?.trim() === "" ||
      data?.coverUrl?.trim() === "" ||
      data?.audioUrl?.trim() === "" ||
      data?.album?.trim() === "" ||
      data?.singer?.trim() === "" ||
      data?.genre?.length <= 0 ||
      data?.playlist?.length <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All Data Are Required",
        },
        { status: 400 },
      );
    }

    const { data: existingSongs, error: checkError } = await supabase
      .from("songs")
      .select("id")
      .eq("name", data?.name?.trim())
      .limit(1);

    if (checkError)
      return NextResponse.json(
        {
          success: false,
          message: "Song Exsits Check Failed",
        },
        { status: 400 },
      );

    if (existingSongs && existingSongs.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Song Already Exists",
        },
        { status: 400 },
      );
    }

    const songData = {
      name: data?.name?.trim(),
      lyric: data?.lyric?.trim() || "",
      audio_url: data?.audioUrl?.trim(),
      cover_url: data?.coverUrl?.trim(),
      singer_id: data?.singer?.trim(),
      album_id: data?.album?.trim(),
      likes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert song and get the ID
    const { data: song, error: insertError } = await supabase
      .from("songs")
      .insert([songData])
      .select()
      .single();

    if (insertError)
      return NextResponse.json(
        {
          success: false,
          message: insertError.message || "Faild To Add Song",
        },
        { status: 405 },
      );

    // Insert genre relationships
    if (data.genre && data.genre.length > 0) {
      const genreRelations = data.genre.map((genreId: string) => ({
        song_id: song.id,
        genre_id: genreId,
        created_at: new Date().toISOString(),
      }));

      const { error: genreError } = await supabase
        .from("songs_genres")
        .insert(genreRelations);

      if (genreError)
        return NextResponse.json(
          {
            success: false,
            message: "Failed To Update Genre",
          },
          { status: 400 },
        );
    }

    // Insert playlist relationships
    if (data.playlist && data.playlist.length > 0) {
      const playlistRelations = data.playlist.map((playlistId: string) => ({
        song_id: song.id,
        playlist_id: playlistId,
        created_at: new Date().toISOString(),
      }));

      const { error: playlistError } = await supabase
        .from("songs_playlists")
        .insert(playlistRelations);

      if (playlistError)
        return NextResponse.json(
          {
            success: false,
            message: "Failed To Update Playlist",
          },
          { status: 400 },
        );
    }

    // Fetch the complete song with relationships
    const { data: AddedSong, error: fetchError } = await supabase
      .from("songs")
      .select(
        `
        *,
        singer:singer_id (id, name),
        album:album_id (id, name),
        songs_genres (genre:genres (id, name)),
        songs_playlists (playlist:playlists (id, name))
      `,
      )
      .eq("id", song.id)
      .single();

    if (fetchError)
      return NextResponse.json(
        {
          success: false,
          message: "Failed To Fetch Added Song",
        },
        { status: 400 },
      );

    return NextResponse.json(
      {
        success: true,
        data: AddedSong,
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
    const { data: songData, id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is Required",
        },
        { status: 400 },
      );
    }

    if (
      songData?.name?.trim() === "" ||
      songData?.coverUrl?.trim() === "" ||
      songData?.audioUrl?.trim() === "" ||
      songData?.album?.trim() === "" ||
      songData?.singer?.trim() === "" ||
      songData?.genre?.length <= 0 ||
      songData?.playlist?.length <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All Data Are Required",
        },
        { status: 400 },
      );
    }

    const updateData = {
      name: songData.name,
      lyric: songData.lyric || "",
      audio_url: songData.audioUrl,
      cover_url: songData.coverUrl,
      singer_id: songData.singer,
      album_id: songData.album,
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from("songs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Found",
        },
        { status: 404 },
      );
    }

    // Delete existing genre relationships
    await supabase.from("songs_genres").delete().eq("song_id", id);

    // Insert new genre relationships
    if (songData.genre && songData.genre.length > 0) {
      const genreRelations = songData.genre.map((genreId: string) => ({
        song_id: id,
        genre_id: genreId,
        created_at: new Date().toISOString(),
      }));

      const { error: genreError } = await supabase
        .from("songs_genres")
        .insert(genreRelations);

      if (genreError)
        return NextResponse.json(
          {
            success: false,
            message: "Failed To Update Genre",
          },
          { status: 405 },
        );
    }

    // Delete existing playlist relationships
    await supabase.from("songs_playlists").delete().eq("song_id", id);

    // Insert new playlist relationships
    if (songData.playlist && songData.playlist.length > 0) {
      const playlistRelations = songData.playlist.map((playlistId: string) => ({
        song_id: id,
        playlist_id: playlistId,
        created_at: new Date().toISOString(),
      }));

      const { error: playlistError } = await supabase
        .from("songs_playlists")
        .insert(playlistRelations);

      if (playlistError)
        return NextResponse.json(
          {
            success: false,
            message: "Failed To Update Playlist",
          },
          { status: 405 },
        );
    }

    // Fetch the complete updated song with relationships
    const { data: completeSong, error: fetchError } = await supabase
      .from("songs")
      .select(
        `
        *,
        singer:singer_id (id, name, created_at, updated_at),
        album:album_id (id, name, created_at, updated_at),
        songs_genres (genre:genres (id, name, created_at, updated_at)),
        songs_playlists (playlist:playlists (id, name, created_at, updated_at))
      `,
      )
      .eq("id", id)
      .single();

    if (fetchError)
      return NextResponse.json(
        {
          success: false,
          message: "Failed To Fetch Updated Song",
        },
        { status: 400 },
      );

    return NextResponse.json({
      success: true,
      data: completeSong,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
