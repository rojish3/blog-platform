import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  fullName: string;
  gender: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  fullName: string;
  gender: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  profilePicture: {
    type: String,
    path: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const UserModel = mongoose.model<IUser>("user", userSchema);
export default UserModel;
