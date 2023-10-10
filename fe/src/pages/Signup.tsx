import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import classNames from "classnames";
import NavBar from "../components/NavBar";
import RegisterImg from "../assets/register.png";

// const signupSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8, "Password must be atleast 8 characters"),
//   confirmPassword: z.string(),
// }).refine(data => data.password == data.confirmPassword, {
//   message: "Password did not match"
// })

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <>
      <div className="h-screen p-4 md:px-8">
        <NavBar />
        <div className="flex justify-center gap-12 mt-12">
          <div className="hidden lg:block w-fit">
            <img src={RegisterImg} alt="Register" className="h-[550px]" />
          </div>
          <form
            className="gap-2 md:gap-3 p-4 w-[350px] max-w-[450px] flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="mt-2 text-sm font-medium text-gray-900">
                Full Name
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("fullName", {
                    required: "Name cannot be empty.",
                    validate: (value) => {
                      if (value.trim() === "") return "Name cannot be empty";
                    },
                  })}
                  className={classNames(
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    { "border-red-500 focus:outline-red-500": errors.fullName }
                  )}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{`${errors.fullName.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-gray-900">
                Gender
              </label>
              <div className="flex flex-row items-start mb-2 gap-4 md:gap-8 w-full min-w-[350px]">
                <div className="flex items-center">
                  <input
                    {...register("gender", {
                      required: "This field is required",
                    })}
                    id="male-radio"
                    type="radio"
                    value="Male"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="male-radio"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("gender", {
                      required: "This field is required",
                    })}
                    id="female-radio"
                    type="radio"
                    value="Female"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="female-radio"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("gender", {
                      required: "This field is required",
                    })}
                    id="others-radio"
                    type="radio"
                    value="Others"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="others-radio"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Others
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-xs text-red-600">{`${errors.gender.message}`}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("phoneNumber", {
                    required: "Phone number cannot be empty",
                    pattern: {
                      value: /^9\d*$/,
                      message: "Invalid phone number",
                    },
                    validate: (value) => {
                      return (
                        value.length === 10 ||
                        "The phone number must be 10 character"
                      );
                    },
                  })}
                  type="text"
                  className={classNames(
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500":
                        errors.phoneNumber,
                    }
                  )}
                  placeholder="98********"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{`${errors.phoneNumber.message}`}</p>
                )}
              </div>
            </div>
            <div>
              <label className="mt-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <div className="relative h-12 w-full min-w-[350px]">
                <input
                  {...register("email", {
                    required: "Email cannot be empty",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Invalid email",
                    },
                  })}
                  className={classNames(
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
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
              <label className="block mt-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative h-10 w-full min-w-[350px]">
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
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    { "border-red-500 focus:outline-red-500": errors.password }
                  )}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500"
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
              <label className="block mt-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="relative h-10 w-full min-w-[350px]">
                <input
                  {...register("confirmPassword", {
                    required: "Password cannot be empty",
                    minLength: {
                      value: 8,
                      message: "Passowrd must be atleast 8 characters",
                    },
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "Password did not match"
                      );
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "border focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                    {
                      "border-red-500 focus:outline-red-500":
                        errors.confirmPassword,
                    }
                  )}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500"
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
              className="w-full min-w-[350px] mt-3 lg:mt-4 text-blue-700 hover:text-white border border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
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
    </>
  );
};

export default Login;
