import { model, models, Schema } from "mongoose";

const SongSchema = new Schema(
  {
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
    lyric: { type: String },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String, required: true },
    singer: { type: Schema.Types.ObjectId, ref: "Singer", required: true },
    album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    playlist: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

export const SongModel = models.Song ?? model("Song", SongSchema);
