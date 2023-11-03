export interface IUser {
  id?: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}
