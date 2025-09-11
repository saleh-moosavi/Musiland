import { Song } from "@models/song.js";
import { User } from "@models/user.js";
import type { Request, Response } from "express";

export const getUserLiked = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedList = user.likedSongs;

    if (likedList.length === 0) {
      return res.json({ likedSongs: [], message: "No liked songs found" });
    }

    const likedSongs = await Song.find({ _id: { $in: likedList } })
      .populate("singer")
      .populate("album")
      .populate("genres")
      .populate("playlists")
      .populate("comments")
      .sort({ createdAt: -1 });

    res.json(likedSongs);
  } catch (err: any) {
    console.error("Error in getUserLiked:", err); // برای دیباگ
    res.status(500).json({ error: err.message });
  }
};

export const changeLike = async (req: Request, res: Response) => {
  try {
    const { userId, songId } = req.body;

    if (!userId || !songId) {
      return res.status(400).json({ error: "UserID and SongID are required" });
    }

    const user = await User.findById(userId);
    const song = await Song.findById(songId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    const isLiked = user.likedSongs.includes(songId);

    if (isLiked) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { likedSongs: songId } },
        { new: true }
      );

      await Song.findByIdAndUpdate(
        songId,
        { $inc: { likes: -1 } },
        { new: true }
      );

      return res.json({
        message: "Like removed",
        ok: true,
      });
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { likedSongs: songId } },
        { new: true }
      );

      await Song.findByIdAndUpdate(
        songId,
        { $inc: { likes: 1 } },
        { new: true }
      );

      return res.json({
        message: "Like added",
        ok: true,
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
