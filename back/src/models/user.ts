import { Schema, model, Document } from "mongoose";

// تعریف رابط برای User
interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// تعریف اسکیما
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

// ایجاد مدل
export const User = model<IUser>("User", userSchema);
