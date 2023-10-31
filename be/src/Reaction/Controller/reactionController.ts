import { Request, Response } from "express";
import Post from "../../Model/post.model";
import Reaction from "../../Model/reaction.model";

// Endpoint to like a post
export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = res.locals.user;
  const userId = user.id; // You should pass the user ID in the request body
  //   console.log(userId);

  try {
    // Check if the user has already liked the post
    const existingLike = await Reaction.findOne({ postId, userId });

    if (existingLike) {
      // If the user has already liked the post, update the like to liked = true
      existingLike.liked = true;
      await existingLike.save();
    } else {
      // If the user hasn't liked the post, create a new like entry
      const newLike = new Reaction({ postId, userId, liked: true });
      await newLike.save();
    }

    res.status(200).json({ message: "Post liked successfully", liked: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while liking the post" });
  }
};

// Endpoint to unlike a post
export const unlikePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = res.locals.user;
  const userId = user.id; // You should pass the user ID in the request body

  try {
    // Find the like entry for the user and post
    const existingLike = await Reaction.findOne({ postId, userId });

    if (existingLike) {
      // Update the existing like to liked = false
      existingLike.liked = false;
      await existingLike.save();
      res
        .status(200)
        .json({ message: "Post unliked successfully", liked: false });
    } else {
      res.status(404).json({ message: "Like entry not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while unliking the post" });
  }
};

export const likesCount = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    // Find all like entries for the specified post with liked = true
    const likeCount = await Reaction.countDocuments({ postId, liked: true });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while getting the like count" });
  }
};

export const getLikeStatus = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = res.locals.user;
  const userId = user._id;
  const post = await Reaction.find({ postId });
  if (post) {
  }
};
