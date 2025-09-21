import { Comment } from "@models/comment.js";
import type { Request, Response } from "express";

export const getAllComment = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentsBySongId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ error: "Song ID is required", ok: false });

    const comments = await Comment.find({ song: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json({
      ok: true,
      count: comments.length,
      data: comments,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error", ok: false });
  }
};

export const getCommentsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ error: "User ID is required", ok: false });

    const comments = await Comment.find({ user: id })
      .populate("song", "name")
      .sort({ createdAt: -1 });
    res.json({
      ok: true,
      count: comments.length,
      data: comments,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error", ok: false });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { description, user, song } = req.body;
    if (!description || !user || !song)
      return res
        .status(400)
        .json({ error: "Description, user, song required" });
    const created = await Comment.create({ description, user, song });
    const comment = await Comment.findById(created._id).populate(
      "user",
      "name"
    );
    res.status(201).json({ comment: comment, ok: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message, ok: false });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment)
      return res.status(404).json({ error: "Comment not found", ok: false });
    res.json({ message: "Comment deleted", ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message, ok: false });
  }
};
