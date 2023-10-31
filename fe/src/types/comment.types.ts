export interface IComment {
  _id: string;
  comment: string;
  author: string;
  postId: IPostId;
  userId: IUserId;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IPostId {
  _id: string;
  userName: string;
  profilePicture: string;
}
interface IUserId {
  _id: string;
  userName: string;
  profilePicture: string;
}
