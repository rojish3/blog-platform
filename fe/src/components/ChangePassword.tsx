import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import classNames from "classnames";
import { FieldValues, useForm } from "react-hook-form";
import NavBar from "./NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const ChangePassword = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const changePassword = async (data: FieldValues) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/users/change-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success(response.data);
        reset();
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
      console.log(error);
    }
  };
  return (
    <>
      {/* Change Password */}
      <div className="h-screen bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
        <NavBar />
        <form onSubmit={handleSubmit(changePassword)}>
          <div className="rounded-lg p-4 w-[400px] mx-auto mt-20 shadow-lg bg-secondary-bg dark:bg-secondary-darkMode-bg">
            <h1 className="text-2xl font-bold text-center mb-4">
              Change Password
            </h1>

            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Old Password
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("oldPassword", {
                    required: "Password cannot be empty",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                      message: "Invalid password",
                    },
                    minLength: {
                      value: 8,
                      message: "Passowrd must be atleast 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500": errors.password,
                    }
                  )}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiSolidHide size={25} />
                  ) : (
                    <BiSolidShow size={25} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600">{`${errors.password.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                New Password
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("password", {
                    required: "Password cannot be empty",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                      message: "Invalid password",
                    },
                    minLength: {
                      value: 8,
                      message: "Passowrd must be atleast 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500": errors.password,
                    }
                  )}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiSolidHide size={25} />
                  ) : (
                    <BiSolidShow size={25} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600">{`${errors.password.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Confirm Password
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500": errors.password,
                    }
                  )}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiSolidHide size={25} />
                  ) : (
                    <BiSolidShow size={25} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{`${errors.confirmPassword.message}`}</p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full min-w-[350px] mt-2 lg:mt-3 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
            >
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
