import { model, models, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    song: { type: Schema.Types.ObjectId, ref: "Song" },
  },
  { timestamps: true }
);

export const CommentModel = models.Comment ?? model("Comment", CommentSchema);
