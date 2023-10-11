import { Request, Response } from "express";
import * as UserServices from "../Service";
import { IUser } from "../Repository";

export const createUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserServices.createUser({ ...req.body }));
  } catch (error) {
    res.status(400).json(error);
  }
};
export const listUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserServices.listUsers());
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    console.log(id.id);
    console.log(req.body);
    const user = await UserServices.updateUser(
      {
        _id: id,
      },
      { ...req.body },
      { new: true }
    );
    console.log("update successful");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
