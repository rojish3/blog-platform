import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rojishranjit3:wBonN0lSva6kuCI4@cluster0.mvw7xc3.mongodb.net/blog-application"
    );
    console.log("Connection Successful");
  } catch (error) {
    console.log("Error Connecting to database");
  }
};

export default connectDb;
