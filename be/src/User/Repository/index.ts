import mongoose from "mongoose";
import connectDb from "../../config/database";

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  gender: String,
  email: String,
  phoneNumber: Number,
  password: String,
  profilePicture: String,
});

export const listUsers = mongoose.model("user", userSchema);
