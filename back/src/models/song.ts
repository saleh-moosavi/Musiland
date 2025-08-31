import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
    lyric: { type: String },
    audioUrl: { type: String },
    coverUrl: { type: String },
    singer: { type: mongoose.Schema.Types.ObjectId, ref: "Singer" },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

export const Song = mongoose.model("Song", SongSchema);
