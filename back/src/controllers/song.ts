import { Song } from "../models/song.js";
import { Album } from "../models/album.js";
import { Genre } from "../models/genre.js";
import { Singer } from "../models/singer.js";
import { Playlist } from "../models/playlist.js";
import type { Request, Response } from "express";

export const getAllSong = async (req: Request, res: Response) => {
  try {
    const { likes, name, singer, album, genre, playlist, sort, page } =
      req.query;
    const query: any = {};

    if (likes) query.likes = { $gt: Number(likes) };
    if (name) query.name = { $regex: name as string, $options: "i" };
    if (singer) {
      const singers = await Singer.find({
        name: { $regex: singer as string, $options: "i" },
      }).select("_id");
      if (singers.length) query.singer = { $in: singers.map((s) => s._id) };
    }
    if (album) {
      const albums = await Album.find({
        name: { $regex: album as string, $options: "i" },
      }).select("_id");
      if (albums.length) query.album = { $in: albums.map((a) => a._id) };
    }
    if (genre) {
      const genreNames = (genre as string).split(",");
      const genres = await Genre.find({ name: { $in: genreNames } }).select(
        "_id"
      );
      if (genres.length) query.genres = { $in: genres.map((g) => g._id) };
    }
    if (playlist) {
      const playlistNames = (playlist as string).split(",");
      const playlists = await Playlist.find({
        name: { $in: playlistNames },
      }).select("_id");
      if (playlists.length)
        query.playlists = { $in: playlists.map((p) => p._id) };
    }

    let sortOption: any = {};
    if (sort) {
      const [field, order] = (sort as string).split(",");
      const sortField = field === "date" ? "createdAt" : field;
      sortOption[sortField] = order === "dec" ? -1 : 1;
    }

    let skip = 0;
    let limit = 10;
    if (page) {
      const [pageNum, perPage] = (page as string).split(",").map(Number);
      skip = (pageNum - 1) * perPage;
      limit = perPage;
    }

    const songs = await Song.find(query)
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists")
      .populate("comments")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json(songs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const song = await Song.findById(id)
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists")
      .populate("comments");
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createSong = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lyric,
      audioUrl,
      coverUrl,
      singerId,
      albumId,
      genreIds,
      playlistIds,
    } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    if (singerId && !(await Singer.findById(singerId)))
      return res.status(400).json({ error: "Invalid singer ID" });
    if (albumId && !(await Album.findById(albumId)))
      return res.status(400).json({ error: "Invalid album ID" });
    if (genreIds) {
      for (const id of genreIds) {
        if (!(await Genre.findById(id)))
          return res.status(400).json({ error: `Invalid genre ID: ${id}` });
      }
    }
    if (playlistIds) {
      for (const id of playlistIds) {
        if (!(await Playlist.findById(id)))
          return res.status(400).json({ error: `Invalid playlist ID: ${id}` });
      }
    }

    const song = await Song.create({
      name,
      lyric,
      audioUrl,
      coverUrl,
      singer: singerId || null,
      album: albumId || null,
      genres: genreIds || [],
      playlists: playlistIds || [],
    });
    res.status(201).json(song);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      lyric,
      audioUrl,
      coverUrl,
      singerId,
      albumId,
      genreIds,
      playlistIds,
    } = req.body;
    if (!id) return res.status(400).json({ error: "ID required" });
    if (!name) return res.status(400).json({ error: "Name required" });
    if (singerId && !(await Singer.findById(singerId)))
      return res.status(400).json({ error: "Invalid singer ID" });
    if (albumId && !(await Album.findById(albumId)))
      return res.status(400).json({ error: "Invalid album ID" });
    if (genreIds) {
      for (const id of genreIds) {
        if (!(await Genre.findById(id)))
          return res.status(400).json({ error: `Invalid genre ID: ${id}` });
      }
    }
    if (playlistIds) {
      for (const id of playlistIds) {
        if (!(await Playlist.findById(id)))
          return res.status(400).json({ error: `Invalid playlist ID: ${id}` });
      }
    }

    const song = await Song.findByIdAndUpdate(
      id,
      {
        name,
        lyric,
        audioUrl,
        coverUrl,
        singer: singerId || null,
        album: albumId || null,
        genres: genreIds || [],
        playlists: playlistIds || [],
      },
      { new: true }
    )
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists")
      .populate("comments");
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const song = await Song.findByIdAndDelete(id);
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
