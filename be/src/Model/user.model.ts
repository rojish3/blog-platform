import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name cannot be empty"],
    },
    userName: {
      type: String,
      required: [true, "Username cannot be empty"],
      match: [/^[a-z0-9_.]+$/, "Invalid username"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minlength: [8, "Password must be atleast 8 characters"],
      // maxlength: [100, "Password must not be more than 100 characters"],
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

//Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const UserModel = mongoose.model<IUser>("user", userSchema);
export default UserModel;
