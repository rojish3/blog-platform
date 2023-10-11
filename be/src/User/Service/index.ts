import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
// import { Model, DocumentDefinition } from "mongoose";
import User, { IUser, UserDocument } from "../Repository";

export const createUser = async (data: IUser) => {
  try {
    const user = User.create(data);
    return "User created successfully";
  } catch (error) {
    return error;
  }
};

export const listUsers = async () => {
  const allUsers = User.find();
  return allUsers;
};

export const updateUser = (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) => {
  return User.findOneAndUpdate(query, update, options);
};

export const deleteUser = (query: FilterQuery<UserDocument>) => {
  return User.deleteOne(query);
};
