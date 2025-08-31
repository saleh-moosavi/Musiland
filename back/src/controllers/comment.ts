import { Comment } from "@models/comment.js";
import type { Request, Response } from "express";

export const getAllComment = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find().populate("user").populate("song");
    res.json(comments);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const comment = await Comment.findById(id)
      .populate("user")
      .populate("song");
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { description, user, song } = req.body;
    if (!description || !user || !song)
      return res
        .status(400)
        .json({ error: "Description, user, song required" });
    const comment = await Comment.create({ description, user, song });
    res.status(201).json(comment);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const updates = req.body;
    const comment = await Comment.findByIdAndUpdate(id, updates, { new: true })
      .populate("user")
      .populate("song");
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
