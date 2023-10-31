import User from "../../Model/user.model";
import bcrypt from "bcrypt";
import { IUser } from "../../types/user.types";

export const createUser = async (data: IUser) => {
  try {
    const { name, userName, phoneNumber, email, password, profilePicture } =
      data;
    console.log(profilePicture);
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    } else {
      const user = await User.create({
        name,
        userName,
        phoneNumber,
        email,
        password,
        profilePicture,
      });
      if (user) {
        return {
          user,
          message: "Signup successful",
        };
      }
    }
  } catch (error) {
    return error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const { email, password } = data;
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      return { status: 401, message: "Invalid email or password" };
    }
    const hashedPass = await bcrypt.compare(password, userInfo.password);
    if (!hashedPass) {
      return { status: 401, message: "Invalid email or password" };
    }
    return {
      status: 200,
      data: userInfo,
      message: "Login successful",
    };
  } catch (error) {
    return { status: 500, message: "Internal server error" };
  }
};

export const listAllUsers = async () => {
  try {
    const allUsers = User.find();
    return allUsers;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (data: any) => {
  try {
    const user = await User.findById(data.id);
    if (user) {
      const { name, userName, phoneNumber, email, profilePicture } = user;
      user.email = email;
      user.name = data.name || name;
      user.userName = data.userName || userName;
      user.phoneNumber = data.phoneNumber || phoneNumber;
      user.profilePicture = data.profilePicture || profilePicture;
      const updatedUser = await user.save();
      return {
        status: 200,
        message: "Update successful",
        data: updatedUser,
      };
    }
  } catch (error) {
    return error;
  }
};

export const changePassword = async (id: any, data: any) => {
  try {
    const user = await User.findById(id);
    const { oldPassword, password } = data;
    console.log(data);
    if (!user) {
      throw new Error("User not found");
    }
    if (!oldPassword || !password) {
      throw new Error("Please enter password");
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (user && passwordMatch) {
      user.password = password;
      await user.save();
      return {
        status: 200,
        message: "Password changed successfully",
      };
    } else {
      return {
        status: 400,
        message: "Password incorrect",
      };
    }
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const { email } = data;
    const userData = await User.findOne({ email });
    if (!userData) {
      throw new Error("User not found");
    }
    return userData;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: any, password: string) => {
  try {
    const userData = await User.findById(token);
    if (!userData) {
      throw new Error("User Not found");
    }
    userData.password = password;
    await userData.save();
    return {
      status: 200,
      message: "Password reset successfully",
    };
  } catch (error) {
    return error;
  }
};
