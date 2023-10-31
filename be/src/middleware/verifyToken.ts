import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"; // Import JwtPayload
import User from "../Model/user.model";
import { env } from "../config";
// import Cookies from 'universal-cookie';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // const token = req.cookies.token;
    // const token = req.headers["authorization"];
    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }
    const verified = jwt.verify(
      token,
      env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
