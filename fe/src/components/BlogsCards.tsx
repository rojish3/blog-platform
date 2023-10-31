import { useEffect, useState } from "react";
import { IBlog } from "../types/post.types";
import { AiOutlineLike, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";
// import { selectUser } from "../features/loggedInUserSlice";
import axios from "axios";
import { RootState } from "../app/store";

const BlogsCards: React.FC<{
  blog: IBlog;
  handlePostDeletion: (postId: string) => void;
}> = ({ blog, handlePostDeletion }) => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [postData, setPostData] = useState<IBlog | null>(blog);
  const [like, setLike] = useState();
  const [comment, setComment] = useState();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.loggedInUser);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const date = new Date(blog.createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
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

  const editPost = async (id: string) => {
    navigate(`/edit/${id}`);
  };

  const deletePost = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/${id}`
      );
      if (response) {
        handlePostDeletion(id);
      }
      // setPostData((prevPosts) => {
      //   if (prevPosts) {
      //     // Ensure prevPosts is an array and then filter it
      //     return prevPosts.filter((post: IBlog) => post._id !== id);
      //   } else {
      //     return null;
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-secondary-bg dark:bg-secondary-darkMode-bg transition-all duration-300 ease-in-out rounded-lg w-full my-2 p-4">
        {/* <img
          src={`http://localhost:3000/api/images/${blog.image}`}
          alt=""
          className="h-52 w-full md:h-60 sm:max-w-[40%] shadow-md rounded-lg bg-slate-50 lg:w-[32rem] object-cover"
        /> */}

        <div className="flex justify-between w-full">
          <div className="flex gap-4 pb-2 w-full">
            <img
              src={`http://localhost:3000/api/images/${blog.userId.profilePicture}`}
              alt="profilePicture"
              className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-xs md:text-base">
                {postData?.userId.userName}
              </p>
              <span className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                {formattedDate}
              </span>
            </div>
          </div>
          <p className="mb-1 text-xs md:text-base content-font font-thin text-gray-700 dark:text-gray-400">
            {postData?.category}
          </p>
        </div>

        <div className="ml-16">
          {token ? (
            <Link to={`/blogs/${postData?._id}`}>
              <h5 className="mb-2 text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer">
                {blog.title.slice(0, 60)}
              </h5>
            </Link>
          ) : (
            <h5
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer"
              onClick={() => setLoginModal(true)}
            >
              {blog.title.slice(0, 60)}
            </h5>
          )}
          {/* <div className="h-12  overflow-hidden text-inherit text-sm md:text-base">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) }}
              className="blogStyling"
            />
          </div> */}
          <div className="flex justify-between items-center">
            <div className="flex gap-8 text-xl pt-2 w-full">
              <span className="flex gap-1 p-1 px-2 items-center text-sm md:text-lg cursor-pointer hover:bg-primary-bg hover:dark:bg-darkMode-bg rounded-md">
                <AiOutlineLike /> {like} Likes
              </span>
              <span className="flex gap-1 p-1 px-2 items-center text-sm md:text-lg cursor-pointer hover:bg-primary-bg hover:dark:bg-darkMode-bg rounded-md">
                <BiCommentDetail /> {comment} Comments
              </span>
            </div>
            {postData && postData?.userId._id == user?._id ? (
              <div className="flex items-center gap-4 text-xl">
                <span
                  className="cursor-pointer"
                  onClick={() => editPost(postData._id)}
                >
                  <AiFillEdit color="green" />
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => deletePost(postData._id)}
                >
                  <AiFillDelete color="red" />
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
    </>
  );
};

export default BlogsCards;
