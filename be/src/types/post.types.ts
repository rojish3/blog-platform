import { ObjectId } from "mongodb";

export interface IPost {
  id?: string;
  image?: string;
  title: string;
  content: string;
  category: string;
  userId: ObjectId;
  views: number;
  createdAt?: Date;
  updatedAt?: Date;
}
