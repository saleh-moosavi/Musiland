import { Album } from "@models/album.js"; // Adjust path as needed
import type { Request, Response } from "express";

export const getAllAlbum = async (req: Request, res: Response) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const album = await Album.findById(id);
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json(album);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const album = await Album.create({ name });
    res.status(201).json(album);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const album = await Album.findByIdAndUpdate(id, { name }, { new: true });
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json(album);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const album = await Album.findByIdAndDelete(id);
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json({ message: "Album deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
