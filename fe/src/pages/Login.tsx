import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
// import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "../schema/loginSchema";
import NavBar from "../components/NavBar";
import RegisterImg from "../assets/register.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { setUser } from "../features/loggedInUserSlice";
import ForgetPasswordModal from "../components/ForgetPasswordModal";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

interface AppState {
  theme: boolean;
}

const Login = () => {
  const mode: boolean = useSelector((state: AppState) => state.theme);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cookies = new Cookies(null, { path: "/" });
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const toastTheme = mode ? "dark" : "light";
  const onSubmit = async (data: TLoginSchema) => {
    try {
      const userData = await axios.post(
        "http://localhost:3000/api/users/login",
        data
      );
      if (userData.status === 200) {
        const token = await userData.data.token;
        cookies.set("token", token);

        // Fetch the user data after a successful login
        const userResponse = await axios.get(
          "http://localhost:3000/api/users/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = userResponse.data;
        socket.emit("user", user.userName);
        // console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        const loggedInUserInfoString = localStorage.getItem("user");
        const loggedInUserInfo = loggedInUserInfoString
          ? JSON.parse(loggedInUserInfoString)
          : null;
        // console.log(loggedInUserInfo);
        // Dispatch the user data to the Redux store
        dispatch(setUser(loggedInUserInfo));

        toast.success(userData.data.message);

        navigate("/");
      }
    } catch (error: any) {
      // const errors = error as Error | AxiosError;
      // if (!axios.isAxiosError(errors)) {
      //   if (error.response.status === 401 || error.status === 400) {
      toast.error(error.response.data.message, {
        position: "top-left",
        autoClose: 1000,
        theme: toastTheme,
      });
      //   }
      // }
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center p-4 md:p-0 gap-1 w-[350px] max-w-[450px]"
          >
            <div>
              <label className="mt-2 text-sm font-medium text-gray-900 text-inherit">
                Email
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("email")}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    { "border-red-500 focus:outline-red-500": errors.email }
                  )}
                  placeholder="Enter Email adderss"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{`${errors.email.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block mt-2 text-sm font-medium text-gray-900 text-inherit">
                Password
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500": errors.password,
                    }
                  )}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-2 text-gray-600"
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

            <button
              disabled={isSubmitting}
              type="submit"
              className="px-4 min-w-[350px] mt-4 lg:mt-6 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
            <div className="flex flex-col items-center gap-1">
              <a
                className="py-2 text-gray-600 cursor-pointer hover:underline"
                onClick={() => setShowModal(true)}
              >
                Forgot your password?
              </a>
              <p>
                Don't have an account?{" "}
                <a
                  className="cursor-pointer text-blue-700 font-semibold hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ForgetPasswordModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Login;
