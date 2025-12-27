import { Schema, model, models } from "mongoose";

interface IUser {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;
