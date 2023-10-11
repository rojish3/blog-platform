import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { FieldValues, useForm } from "react-hook-form";

import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import RegisterImg from "../assets/register.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <>
      <div className="h-screen">
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
              <label className="mt-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Invalid Email, please enter valid email",
                    },
                  })}
                  className={classNames(
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
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
              <label className="block mt-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative h-10 w-full min-w-[350px]">
                <input
                  {...register("password", {
                    required: "This filed is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                      message:
                        "Password must contain a Uppercase letter, a number and a symbol",
                    },
                    minLength: {
                      value: 8,
                      message: "Passowrd must be atleast 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500": errors.password,
                    }
                  )}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-700"
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
              className="px-4 min-w-[350px] mt-8 text-blue-700 hover:text-white border border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
            <div className="flex flex-col items-center gap-1">
              <a
                className="py-2 text-gray-400 cursor-pointer hover:underline"
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
    </>
  );
};

export default Login;
