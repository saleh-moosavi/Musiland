import { model, Schema } from "mongoose";

const SongSchema = new Schema(
  {
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
    lyric: { type: String },
    audioUrl: { type: String },
    coverUrl: { type: String },
    singer: { type: Schema.Types.ObjectId, ref: "Singer" },
    album: { type: Schema.Types.ObjectId, ref: "Album" },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const Song = model("Song", SongSchema);
