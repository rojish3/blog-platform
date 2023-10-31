import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  TUpdateProfileSchema,
} from "../schema/updateProfileSchema";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setUser } from "../features/loggedInUserSlice";
import { AiOutlineClose } from "react-icons/ai";
import { Slide } from "react-awesome-reveal";

interface IUpdateProfile {
  viewProfile: boolean;
  setViewProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfile: React.FC<IUpdateProfile> = ({
  viewProfile,
  setViewProfile,
}) => {
  const user = useSelector((state: RootState) => state.loggedInUser);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<TUpdateProfileSchema>({
    name: user?.name,
    userName: user?.userName,
    phoneNumber: user?.phoneNumber,
  });

  useEffect(() => {
    setFormData({
      name: user?.name,
      userName: user?.userName,
      phoneNumber: user?.phoneNumber,
    });
    setImagePreview(`http://localhost:3000/api/images/${user?.profilePicture}`);
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  });

  const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(file);
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload an image file.");
      }
    }
  };

  const onSubmit = async (data: TUpdateProfileSchema) => {
    try {
      if (data) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("userName", data.userName);
        formData.append("phoneNumber", data.phoneNumber);

        if (profileImage) {
          formData.append("profilePicture", profileImage);
        }

        const userData = await axios.patch(
          "http://localhost:3000/api/users/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (userData.status === 200) {
          console.log(userData);
          dispatch(setUser(userData.data.data));
          toast.success(userData.data.message);
          setViewProfile(false);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      }
    }
  };
  if (!viewProfile) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex justify-around">
        <Slide direction="down">
          <div className="rounded-lg p-4 shadow-2xl bg-secondary-bg dark:bg-secondary-darkMode-bg border">
            <form
              className="gap-1 md:gap-3 p-4 md:p-0 w-[400px] max-w-[450px] flex flex-col justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full justify-between items-center ">
                <h1 className="text-2xl font-bold">Update Profile</h1>
                <span className="cursor-pointer">
                  <AiOutlineClose onClick={() => setViewProfile(false)} />
                </span>
              </div>
              <div>
                <div className="flex flex-col items-center space-x-6">
                  <div className="shrink-0">
                    <img
                      className="h-36 w-36 md:h-48 md:w-48 object-cover rounded-full"
                      // src={`http://localhost:3000/api/images/${user?.profilePicture}`}
                      src={imagePreview}
                      alt="Current profile photo"
                    />
                  </div>
                  <label className="block">
                    <input
                      type="file"
                      onChange={loadFile}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-violet-100"
                    />
                  </label>
                </div>
              </div>
              <div className="font-light">{user?.email}</div>
              <div>
                <label className="text-sm font-medium text-inherit">Name</label>
                <div className="relative h-12 w-full min-w-[400px]">
                  <input
                    {...register("name")}
                    defaultValue={formData.name}
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
                <div className="relative h-12 w-full min-w-[400px]">
                  <input
                    {...register("userName")}
                    defaultValue={formData.userName}
                    className={classNames(
                      "bg-inherit border-2 focus:outline-blue-500 border-gray-500 text-inherit text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10",
                      {
                        "border-red-500 focus:outline-red-500": errors.userName,
                      }
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
                <div className="relative h-12 w-full min-w-[400px]">
                  <input
                    {...register("phoneNumber")}
                    defaultValue={formData.phoneNumber}
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

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full max-w-[200px] mt-2 lg:mt-3 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default UpdateProfile;
