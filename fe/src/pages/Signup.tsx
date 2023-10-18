import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, TSignupSchema } from "../schema/signupSchema";
import classNames from "classnames";
import NavBar from "../components/NavBar";
import RegisterImg from "../assets/register.png";
import { useSelector } from "react-redux";
interface AppState {
  theme: boolean;
}
const Signup = () => {
  const { mode }: any = useSelector((state: AppState) => state.theme);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignupSchema>({ resolver: zodResolver(signupSchema) });
  const toastTheme = mode ? "dark" : "light";

  const onSubmit = async (data: TSignupSchema) => {
    try {
      // console.log(data);
      const userData = await axios.post(
        "http://localhost:3000/api/users/register",
        data
      );
      if (userData.status === 200) {
        toast.success(userData.data.message, {
          position: "top-left",
          autoClose: 1000,
          theme: toastTheme,
        });
        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
      }
      console.log(userData);
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message, {
          position: "top-left",
          autoClose: 1000,
          theme: toastTheme,
        });
      }
    }
  };
  return (
    <>
      <div className="h-screen bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
        <NavBar />
        <div className="flex justify-center gap-12 p-4 md:px-8">
          <div className="hidden md:block w-fit">
            <img
              src={RegisterImg}
              alt="Register"
              className="h-[550px] object-contain"
            />
          </div>
          <form
            className="gap-1 md:gap-3 p-4 md:p-0 w-[350px] max-w-[450px] flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Name
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("name")}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    { "border-red-500 focus:outline-red-500": errors.name }
                  )}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{`${errors.name.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Username
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("userName")}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    { "border-red-500 focus:outline-red-500": errors.userName }
                  )}
                  placeholder="johndoe"
                />
                {errors.userName && (
                  <p className="text-sm text-red-600">{`${errors.userName.message}`}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Phone Number
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("phoneNumber")}
                  type="text"
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500":
                        errors.phoneNumber,
                    }
                  )}
                  placeholder="9*********"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{`${errors.phoneNumber.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Email
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("email")}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    { "border-red-500 focus:outline-red-500": errors.email }
                  )}
                  placeholder="johndoe@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{`${errors.email.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Password
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
            {/* <div>
              <label className="mt-2 text-sm font-medium text-inherit">
                Profile Picture
              </label>
              <div className="h-12 w-full min-w-[350px]">
                <input
                  {...register("profilePicture")}
                  type="file"
                  className={classNames({
                    // button colors
                    "file:bg-blue-50 file:dark:bg-blue-400 file:dark:text-blue-50 file:text-blue-500 hover:file:bg-blue-100":
                      true,
                    // button shape and spacing
                    "file:rounded-lg file:rounded-tr-none file:rounded-br-none":
                      true,
                    "file:px-4 file:py-2 file:mr-4 file:border-none ": true,
                    // overall input styling
                    "hover:cursor-pointer border-2 rounded-lg text-gray-400 border-gray-500 text-sm w-full block focus:ring-blue-500 focus:border-blue-500":
                      true,
                  })}
                />
              </div>
            </div> */}

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full min-w-[350px] mt-2 lg:mt-3 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <p>
              Already have an account?{" "}
              <a
                className="cursor-pointer text-blue-700 font-semibold hover:underline"
                onClick={() => navigate("/login")}
              >
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Signup;
