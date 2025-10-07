import { Genre } from "@models/genre.js";
import type { Request, Response } from "express";

// ✅ Get all genres
export const getAllGenre = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      data: genres,
      message: genres.length
        ? "Genres fetched successfully"
        : "No genres found",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Get genre by ID
export const getByIdGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Genre ID is required" });

    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({
      data: genre,
      message: "Genre fetched successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Create new genre
export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const genre = await Genre.create({ name });
    res.status(201).json({
      data: genre,
      message: "Genre created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Update genre
export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) return res.status(400).json({ message: "Genre ID is required" });
    if (!name) return res.status(400).json({ message: "Name is required" });

    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({
      data: genre,
      message: "Genre updated successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

// ✅ Delete genre
export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Genre ID is required" });

    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({
      message: "Genre deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
