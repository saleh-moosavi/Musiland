import { model, models, Schema } from "mongoose";

const SingerSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const SingerModel = models.Singer ?? model("Singer", SingerSchema);

export interface ISinger {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISingerResponse {
  success: boolean;
  data?: ISinger;
  message?: string;
}
