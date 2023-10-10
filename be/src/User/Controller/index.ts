import { Request, Response } from "express";
import * as UserServices from "../Service";

// export const listUsers = async (req: Request, res: Response) => {
//   let users = await UserRepository.listUsers.find();
// };

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const user = await UserServices.createUser({
//       fullName: "Rojish Ranjit",
//       gender: "Male",
//       phoneNumber: 9876543210,
//       email: "rojishranjit3@gmail.com",
//       password: "Apple@123",
//     });
//     console.log(user);
//     return user;
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
export const listUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.listUsers({
      _id: "65243823bc920c7fccda40aa",
    });
    console.log(user);
    return user;
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.updateUser(
      {
        name: "Rojish Ranjit",
      },
      { name: "Rojish" },
      { new: true }
    );
    console.log("update successful");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
