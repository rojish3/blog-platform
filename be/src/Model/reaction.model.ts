import mongoose from "mongoose";
const reactionSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    // userName: {
    //   type: String,
    //   required: true,
    // },
    liked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const ReactionModel = mongoose.model("reaction", reactionSchema);
export default ReactionModel;
