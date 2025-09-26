import { Genre } from "@models/genre.js";
import type { Request, Response } from "express";

export const getAllGenre = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.status(200).json({ ok: true, genres });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const getByIdGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }

    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).json({ ok: false, error: "Genre not found" });
    }

    return res.status(200).json({ ok: true, genre });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    const genre = await Genre.create({ name });
    return res.status(201).json({ ok: true, genre });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }
    if (!name) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    if (!genre) {
      return res.status(404).json({ ok: false, error: "Genre not found" });
    }

    return res.status(200).json({ ok: true, genre });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "ID is required" });
    }

    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) {
      return res.status(404).json({ ok: false, error: "Genre not found" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Genre deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
