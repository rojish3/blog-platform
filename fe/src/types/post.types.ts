export interface IBlog {
  filter(arg0: (post: IBlog) => boolean): IBlog | null;
  _id: string;
  image: string;
  title: string;
  category: string;
  content: string;
  userId: IUserId;
  userName: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserId {
  _id: string;
  userName: string;
  profilePicture: string;
}
