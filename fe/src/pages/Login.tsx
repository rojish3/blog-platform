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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

interface AppState {
  theme: boolean;
}

const Login = () => {
  const { mode }: any = useSelector((state: AppState) => state.theme);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
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
                // onClick={() => setShowModal(true)}
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
      <ToastContainer />
    </>
  );
};

export default Login;
