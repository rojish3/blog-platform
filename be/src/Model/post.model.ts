import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image cannot be empty"],
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
export default PostModel;
