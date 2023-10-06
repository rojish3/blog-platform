import mongoose from "mongoose";
import { env } from "./index";

const uri: string = env.MONGO_URI ?? "";
console.log(uri);

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Error Connecting to database");
  }
};

export default connectDb;
