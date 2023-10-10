import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
// import { Model, DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../Repository";

export const listUsers = async (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  // console.log("Hello list users");
  return User.find(query, {}, options);
};

// export const createUser = (input: DocumentDefinition<UserDocument>) => {
//   return User.create(input);
// };

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
