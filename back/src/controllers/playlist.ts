import { Playlist } from "@models/playlist.js"; // Adjust path as needed
import type { Request, Response } from "express";

export const getAllPlaylist = async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json(playlist);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const playlist = await Playlist.create({ name });
    res.status(201).json(playlist);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json(playlist);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json({ message: "Playlist deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
