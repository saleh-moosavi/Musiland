import { Genre } from "@models/genre.js"; // Adjust path as needed
import type { Request, Response } from "express";

export const getAllGenre = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.json(genre);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.json(genre);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.json({ message: "Genre deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
