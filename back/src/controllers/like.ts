import { Song } from "@models/song.js";
import { User } from "@models/user.js";
import type { Request, Response } from "express";

//  ✅ Get all liked songs for a user
export const getUserLiked = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    const user = await User.findById(userId).populate({
      path: "likedSongs",
      populate: ["singer", "album", "genres", "playlists"],
      options: { sort: { createdAt: -1 } },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const data = user.likedSongs || [];
    res.status(200).json({
      data,
      message: data.length === 0 ? "No liked songs found" : "Success",
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

//  ✅ Toggle like/unlike a song
export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { userId, songId } = req.body;
    if (!userId || !songId)
      return res.status(400).json({ message: "Missing parameters" });

    const [user, song] = await Promise.all([
      User.findById(userId),
      Song.findById(songId),
    ]);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!song) return res.status(404).json({ message: "Song not found" });

    const isLiked = user.likedSongs.includes(songId);
    await User.findByIdAndUpdate(
      userId,
      isLiked
        ? { $pull: { likedSongs: songId } }
        : { $addToSet: { likedSongs: songId } }
    );

    const newLikes = Math.max(0, song.likes + (isLiked ? -1 : 1));
    await song.updateOne({ likes: newLikes });

    res.status(200).json({
      message: isLiked ? "Like removed" : "Like added",
      data: newLikes,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
