import { Playlist } from "@models/playlist.js";
import type { Request, Response } from "express";

// ✅ Get all playlists
export const getAllPlaylist = async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json({
      data: playlists,
      message: playlists.length
        ? "Playlists fetched successfully"
        : "No playlists found",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Get playlist by ID
export const getByIdPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Playlist ID is required" });

    const playlist = await Playlist.findById(id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json({
      data: playlist,
      message: "Playlist fetched successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Create new playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const playlist = await Playlist.create({ name });
    res.status(201).json({
      data: playlist,
      message: "Playlist created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Update playlist
export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id)
      return res.status(400).json({ message: "Playlist ID is required" });
    if (!name) return res.status(400).json({ message: "Name is required" });

    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json({
      data: playlist,
      message: "Playlist updated successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Delete playlist
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Playlist ID is required" });

    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json({
      message: "Playlist deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
