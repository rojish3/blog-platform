import { ObjectId } from "mongodb";

export interface IPost {
  image?: String;
  title: String;
  content: String;
  category: String;
  userId: ObjectId;
  views: Number;
  createdAt?: Date;
  updatedAt?: Date;
}
