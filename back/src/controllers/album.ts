import { Album } from "@models/album.js";
import type { Request, Response } from "express";

export const getAllAlbum = async (req: Request, res: Response) => {
  try {
    const albums = await Album.find();
    return res.status(200).json({ ok: true, albums });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const getByIdAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }

    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ ok: false, error: "Album not found" });
    }

    return res.status(200).json({ ok: true, album });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    const album = await Album.create({ name });
    return res.status(201).json({ ok: true, album });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const updateAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }
    if (!name) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    const album = await Album.findByIdAndUpdate(id, { name }, { new: true });
    if (!album) {
      return res.status(404).json({ ok: false, error: "Album not found" });
    }

    return res.status(200).json({ ok: true, album });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }

    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({ ok: false, error: "Album not found" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Album deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
