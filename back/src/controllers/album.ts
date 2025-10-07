import { Album } from "@models/album.js";
import type { Request, Response } from "express";

// ✅ Get all albums
export const getAllAlbum = async (_req: Request, res: Response) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: albums,
      message: albums.length === 0 ? "No albums found" : "Success",
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// ✅ Get album by ID
export const getByIdAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Album ID is required" });

    const album = await Album.findById(id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    res.status(200).json({ data: album, message: "Success" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// ✅ Create new album
export const createAlbum = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await Album.findOne({ name });
    if (existing)
      return res.status(409).json({ message: "Album already exists" });

    const album = await Album.create({ name });
    res
      .status(201)
      .json({ data: album, message: "Album created successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// ✅ Update album
export const updateAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) return res.status(400).json({ message: "Album ID is required" });
    if (!name) return res.status(400).json({ message: "Name is required" });

    const album = await Album.findByIdAndUpdate(id, { name }, { new: true });
    if (!album) return res.status(404).json({ message: "Album not found" });

    res
      .status(200)
      .json({ data: album, message: "Album updated successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// ✅ Delete album
export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Album ID is required" });

    const album = await Album.findByIdAndDelete(id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
