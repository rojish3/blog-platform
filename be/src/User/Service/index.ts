// import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import * as UserRepository from "../Repository";
import { IUser } from "../../types/user.types";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { env } from "../../config";

// const generateToken = (id) => {
//   return jwt.sign(id, env.JWT_SECRET, { expiresIn: "1d" });
// };
interface JwtPayload {
  id: string; // Define other properties as needed
  // ...
}
export const createUser = async (data: IUser) => {
  try {
    const user = await UserRepository.createUser(data);
    // const token = generateToken(user._id);
    return user;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user: any) => {
  try {
    const { status, data, message } = await UserRepository.loginUser(user);
    if (status === 200) {
      const token = jwt.sign(
        {
          id: data?._id,
        },
        env.JWT_SECRET as string
      );
      return { token, status, message };
    }
    return { status, message };
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const loginStatus = async (token: any) => {
  try {
    if (!token) {
      return false;
    }
    const verified = jwt.verify(token, env.JWT_SECRET as string);
    if (verified) {
      return true;
    }
  } catch (error) {}
};

export const listUsers = async () => {
  try {
    const allUsers = await UserRepository.listAllUsers();
    return allUsers;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: any, data: any) => {
  try {
    const updatedUser = await UserRepository.updateUser(id, data);
    return updatedUser;
  } catch (error) {
    return error;
  }
};

export const changePassword = async (id: any, data: any) => {
  try {
    const changedPassword = await UserRepository.changePassword(id, data);
    return changedPassword;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const userData = await UserRepository.forgotPassword(data);
    // console.log(userEmail);
    if (userData) {
      const userId = userData._id;
      const id = { id: userId.toHexString() };
      console.log(id);
      const emailToken = jwt.sign(id, env.JWT_SECRET as string);
      const resetLink = `http://localhost:5173/reset-password?token=${emailToken}`;
      console.log(resetLink);
      const mailOptions = {
        from: env.USER_EMAIL,
        to: userData.email,
        subject: "Password Reset Request",
        html: `
        <p>Hello,</p>
        <p>You have requested to reset your password. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        `,
      };
      await transporter.sendMail(mailOptions);
      return "Password reset email sent successfully.";
    }
  } catch (error) {
    return error;
  }
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.USER_EMAIL,
    pass: env.USER_PASS,
  },
});

export const resetPassword = async (token: any, password: string) => {
  try {
    const userToken = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
    if (userToken) {
      const id = userToken.id;
      return await UserRepository.resetPassword(id, password);
    }
  } catch (error) {
    return error;
  }
};
