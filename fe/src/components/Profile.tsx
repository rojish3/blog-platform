import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import Cookies from "universal-cookie";
import BlogsCards from "./BlogsCards";
import UpdateProfile from "./EditProfile";
import { IBlog } from "../types/post.types";
import BlogListSkeleton from "./BlogListSkeleton";
import { defaultBlogRender } from "../utils/constants";

const Profile: React.FC = () => {
  const [postData, setPostData] = useState<IBlog[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.loggedInUser);
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await axios.get(
          `http://localhost:3000/api/posts/getposts`
        );
        const data = posts.data;
        // console.log(data);
        setPostData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  // Function to open the Edit Profile modal
  const openEditProfile = () => {
    setViewProfile(true);
  };

  const handlePostDeletion = (postId: string) => {
    setPostData((prevData) => prevData.filter((post) => post._id !== postId));
  };
  if (user) {
    const { name, userName, profilePicture, createdAt } = user;
    const formattedDate = formatDate(createdAt);
    return (
      <>
        <div className="min-h-screen bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text w-full md:w-[70%] mx-auto p-4 md:p-8">
          <div className="relative max-h-[250px] max-w-[1200px] rounded-lg m-auto mt-10 overflow-visible p-4 bg-secondary-bg dark:bg-secondary-darkMode-bg">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 md:-top-14">
              <img
                src={`http://localhost:3000/api/images/${profilePicture}`}
                alt="profilePicture"
                className="h-20 md:h-28 w-20 md:w-28 rounded-full border-8 border-primary-bg dark:border-darkMode-bg object-cover z-10"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={openEditProfile} // Open the Edit Profile modal
                className="self-end max-w-[150px] px-4 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-2 md:p-3 text-center transition-all ease-in-out duration-300"
              >
                Edit Profile
              </button>
              <h1 className="text-3xl md:text-5xl mb-4">{name}</h1>
              <h3 className="text-xl md:text-2xl mb-4">@{userName}</h3>
              <p className="text-sm md:text-base">
                🎂 Joined on {formattedDate}
              </p>
            </div>
          </div>
          <div className="w-full flex gap-4 justify-center">
            {isLoading ? (
              <div className="hidden  md:block w-56 h-24 p-2 mt-2 bg-secondary-bg dark:bg-secondary-darkMode-bg rounded-lg">
                <div className="h-3.5 bg-gray-200 rounded-md dark:bg-gray-700 mt-2 mb-3"></div>
                <div className="h-3.5 bg-gray-200 rounded-md dark:bg-gray-700"></div>
              </div>
            ) : (
              postData && (
                <div className="hidden md:block w-56 h-24 p-2 mt-2 bg-secondary-bg dark:bg-secondary-darkMode-bg rounded-lg">
                  <p>{postData.length} post(s) published</p>
                  <p>comments written</p>
                </div>
              )
            )}
            <div className="p-0 m-0 w-full">
              {isLoading ? (
                <div className="">
                  {defaultBlogRender.map((_, index) => (
                    <BlogListSkeleton key={index} />
                  ))}
                </div>
              ) : (
                postData &&
                postData.map((post) => (
                  <BlogsCards
                    key={post._id}
                    blog={post}
                    handlePostDeletion={handlePostDeletion}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {viewProfile && (
          <UpdateProfile
            viewProfile={viewProfile}
            setViewProfile={setViewProfile}
          />
        )}
      </>
    );
  }
};

export default Profile;
