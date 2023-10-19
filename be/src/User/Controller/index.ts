import { Request, Response } from "express";
import * as UserServices from "../Service";
import { IUser } from "../../types/user.types";
import { IResponse } from "../../types/response.types";

export const createUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserServices.createUser({ ...req.body }));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { status, token, message } = await UserServices.loginUser({
      ...req.body,
    });
    res.cookie("token", token as string, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "strict",
      secure: true,
    });
    res.status(status).json({ message, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "Logout successful" });
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

export const getLoggedInUserData = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginStatus = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    res.status(200).json(await UserServices.loginStatus(token));
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const id = user.id;
    const response = (await UserServices.updateUser(id, {
      ...req.body,
    })) as IResponse;
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const id = user.id;
    const response = (await UserServices.changePassword(id, {
      ...req.body,
    })) as IResponse;
    res.status(200).json(response.message);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserServices.forgotPassword(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    res.status(200).json(await UserServices.resetPassword(token, password));
  } catch (error) {
    res.status(400).json(error);
  }
};
