import { Playlist } from "@models/playlist.js";
import type { Request, Response } from "express";

export const getAllPlaylist = async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find();
    return res.status(200).json({ ok: true, playlists });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const getByIdPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }

    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ ok: false, error: "Playlist not found" });
    }

    return res.status(200).json({ ok: true, playlist });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    const playlist = await Playlist.create({ name });
    return res.status(201).json({ ok: true, playlist });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }
    if (!name) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!playlist) {
      return res.status(404).json({ ok: false, error: "Playlist not found" });
    }

    return res.status(200).json({ ok: true, playlist });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }

    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      return res.status(404).json({ ok: false, error: "Playlist not found" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Playlist deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
