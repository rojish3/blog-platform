import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { IBlog } from "../types/post.types";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import axios from "axios";

const BlogCard: React.FC<{ blog: IBlog }> = ({ blog }) => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [like, setLike] = useState();
  const [comment, setComment] = useState();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const date = new Date(blog.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    const getLikesCount = async () => {
      try {
        const likes = await axios.get(
          `http://localhost:3000/api/reactions/count/${blog._id}`
        );
        // console.log(likes);
        const data = likes.data.likeCount;
        setLike(data);
      } catch (error) {
        return error;
      }
    };
    getLikesCount();
  }, [blog._id]);
  useEffect(() => {
    const getCommentsCount = async () => {
      try {
        const comments = await axios.get(
          `http://localhost:3000/api/comments/count/${blog._id}`
        );
        // console.log(likes);
        const data = comments.data;
        setComment(data);
      } catch (error) {
        return error;
      }
    };
    getCommentsCount();
  }, [blog._id]);
  return (
    <>
      <div className="relative max-w-sm h-[450px] w-[350px] bg-white border border-gray-200 rounded-lg shadow dark:bg-secondary-darkMode-bg dark:border-gray-700 my-2  md:my-4 hover:bg-secondary-bg dark:hover:bg-darkMode-bg transition-all duration-300 ease-in-out">
        <img
          className="h-2/5 w-full object-cover rounded-t-lg"
          src={`http://localhost:3000/api/images/${blog.image}`}
          alt=""
        />
        <div className="p-5">
          <span className="content-font font-thin text-gray-700 dark:text-gray-400">
            {blog.category}
          </span>
          {token ? (
            <Link to={`/blogs/${blog._id}`}>
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer overflow-hidden">
                {blog.title.slice(0, 25)}
              </h5>
            </Link>
          ) : (
            <h5
              className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer overflow-hidden"
              onClick={() => setLoginModal(true)}
            >
              {blog.title.slice(0, 25)}
            </h5>
          )}
          <div
            className="blogStyling text-xs h-12 overflow-hidden" // Use the 'prose' class from Tailwind CSS to style the content
            dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 80) }}
          />

          {/* {blog.content.slice(0, 100)} */}

          <div className="absolute left-0 bottom-10 user-profile flex gap-4 p-4 w-full">
            <img
              src={`http://localhost:3000/api/images/${blog.userId.profilePicture}`}
              alt="profilePicture"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-sm">{blog.userId.userName}</p>
              <span className="text-gray-600 dark:text-gray-300 text-xs">
                {formattedDate}
              </span>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 flex gap-8 text-2xl p-2 px-4 w-full">
            <span className="flex gap-1 p-1 items-center hover:bg-gray-200 hover:dark:bg-secondary-darkMode-bg rounded-md cursor-pointer">
              <AiOutlineLike /> {like}
            </span>
            <span className="flex gap-1 p-1 items-center hover:bg-gray-200 hover:dark:bg-secondary-darkMode-bg rounded-md cursor-pointer">
              <BiCommentDetail /> {comment}
            </span>
          </div>
        </div>
      </div>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
    </>
  );
};

export default BlogCard;
