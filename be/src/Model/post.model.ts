import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    content: {
      type: String,
      required: [true, "Content cannot be empty"],
    },
    category: {
      type: String,
      required: [true, "Category cannot be empty"],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
export default PostModel;
