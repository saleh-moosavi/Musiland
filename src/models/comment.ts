import { IUser } from "./user";
import { ISong } from "./song";
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

export interface IComment {
  _id: string;
  description: string;
  user:
    | IUser
    | {
        _id: string;
        name: string;
      };
  song:
    | ISong
    | {
        _id: string;
        name: string;
      };
  createdAt: string;
  updatedAt: string;
}

export interface ICommentResponse {
  success: boolean;
  data?: IComment;
  message?: string;
}

export interface IGetAllCommentsResponse {
  success: boolean;
  data?: IComment[];
  message?: string;
}
