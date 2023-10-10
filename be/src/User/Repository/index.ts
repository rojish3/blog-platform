import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  fullName: string;
  gender: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePicture: string;
}

interface IUser {
  fullName: string;
  gender: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePicture: string;
}

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  gender: {
    type: String,
    required: [true, "This field is required"],
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number cannot be empty"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
  },
  profilePicture: String,
});

const UserModel = mongoose.model<IUser>("user", userSchema);
export default UserModel;
