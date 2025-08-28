import { Singer } from "@models/singer.js";
import type { Request, Response } from "express";

export const getAllSinger = async (req: Request, res: Response) => {
  try {
    const singers = await Singer.find();
    res.json(singers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdSinger = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const singer = await Singer.findById(id);
    if (!singer) return res.status(404).json({ error: "Singer not found" });
    res.json(singer);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createSinger = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const singer = await Singer.create({ name });
    res.status(201).json(singer);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSinger = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const singer = await Singer.findByIdAndUpdate(id, { name }, { new: true });
    if (!singer) return res.status(404).json({ error: "Singer not found" });
    res.json(singer);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSinger = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const singer = await Singer.findByIdAndDelete(id);
    if (!singer) return res.status(404).json({ error: "Singer not found" });
    res.json({ message: "Singer deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
