import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../blogpost.style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { AiFillEye, AiFillDelete, AiFillLike } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { IBlog } from "../types/post.types";
import { IComment } from "../types/comment.types";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const BlogPost: React.FC = () => {
  const user = useSelector((state: RootState) => state.loggedInUser);
  const [postData, setPostData] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentData, setCommentData] = useState<IComment[] | null>(null);
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const post = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPostData(post.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [dispatch, id]);

  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   socket.on('new-like', (liker, postOwner) => {
  //     if (postOwner === userName) {
  //       console.log(`${liker} liked your post.`);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [userName]);

  const handleLikeClick = async () => {
    if (!liked) {
      // Like the post and emit 'new-like' event to Socket.IO server
      try {
        const like = await axios.post(
          `http://localhost:3000/api/reactions/like/${id}`
        );
        setLiked(like.data.liked);
        setLikeCount(likeCount + 1);

        socket.emit("new-like", user?.userName, postData?.userName);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Unlike the post
      try {
        const unlike = await axios.post(
          `http://localhost:3000/api/reactions/unlike/${id}`
        );
        setLiked(unlike.data.liked);
        setLikeCount(likeCount - 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getLikesCount = async () => {
      try {
        const likes = await axios.get(
          `http://localhost:3000/api/reactions/count/${id}`
        );
        // console.log(likes);
        const data = likes.data.likeCount;
        setLikeCount(data);
      } catch (error) {
        return error;
      }
    };
    getLikesCount();
  }, [id]);

  useEffect(() => {
    const getComment = async () => {
      try {
        const comments = await axios.get(
          `http://localhost:3000/api/comments/${id}`
        );
        const commentData = comments.data;
        // console.log(commentData);
        setCommentData(commentData);
        // console.log(commentData);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, [id]);

  const postComment = async () => {
    const trimmedComment = comment.trim(); // Trim whitespace

    if (!trimmedComment) {
      alert("Comment cannot be empty");
      return;
    }
    const data = {
      comment: trimmedComment,
      author: postData?.userId,
      postId: id,
    };

    try {
      const comments = await axios.post(
        `http://localhost:3000/api/comments`,
        data
      );
      if (comments.status === 201) {
        setComment(""); // Clear the comment input field
        const newComment = comments.data.data;
        setCommentData((prevCommentData) => {
          if (prevCommentData) {
            return [newComment, ...prevCommentData];
          } else {
            return [newComment];
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`);
      setCommentData(
        (prevComments) =>
          prevComments?.filter((comment) => comment._id !== commentId) ?? null
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-primary-bg h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  const { _id, profilePicture } = user;

  return (
    <>
      <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
        <NavBar />
        {isLoading ? (
          <div className="flex space-x-2 justify-center items-center bg-primary-bg h-screen dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
          </div>
        ) : postData ? (
          <div className="relative h-auto w-[90%] md:w-[50%] rounded-lg mx-auto bg-secondary-bg dark:bg-secondary-darkMode-bg shadow my-4">
            <img
              src={`http://localhost:3000/api/images/${postData.image}`}
              alt="cover image"
              className="w-full object-cover rounded-t-md md:rounded-t-lg max-h-[175px] md:max-h-[400px]"
            />
            <div className="absolute top-2 right-2 py-1 px-2 rounded-full opacity-70 flex items-center gap-2 text-white bg-black">
              <AiFillEye /> {postData.views}
            </div>
            <div className="article-section p-2 md:p-8">
              <div className="flex justify-between items-center">
                <div className="user-profile flex gap-4 my-2 md:my-4">
                  <img
                    src={`http://localhost:3000/api/images/${postData.userId.profilePicture}`}
                    alt="profilePicture"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm">
                      {postData.userId.userName}
                    </p>
                    <span className="text-gray-600 text-xs">
                      {formatDate(String(postData.createdAt))}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg italic ">
                    {postData.category}
                  </p>
                </div>
              </div>
              <div className="title text-2xl md:text-5xl font-bold py-2 md:py-4">
                {postData.title}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: postData.content }}
                className="blogStyling mb-4" // Use the 'prose' class from Tailwind CSS to style the content
              />
              <hr />
              <p className="text-lg md:text-2xl p-2 flex items-center">
                <button
                  onClick={handleLikeClick}
                  className={`cursor-pointer hover:scale-x-110 ${
                    liked ? "text-blue-700" : ""
                  }`}
                >
                  {/* {liked ? <AiFillLike color="#007FFF" /> : <AiFillLike />} */}
                  <AiFillLike />
                  {/*  */}
                </button>
                <span className="ml-4">{likeCount} Likes</span>
              </p>
              <hr />

              {/* Write COmment */}
              <div className="w-full">
                <h2 className="text-2xl font-bold py-4">Comments</h2>
                <div className="flex w-full gap-4">
                  <img
                    // src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    src={`http://localhost:3000/api/images/${profilePicture}`}
                    alt="profilePicture"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                  />
                  <div className="w-full">
                    <textarea
                      rows={2}
                      placeholder="Enter your thoughts here..."
                      className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-darkMode-bg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      onClick={() => postComment()}
                      className="px-4 mt-1 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {commentData
                ? commentData
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((comment) => (
                      <div key={comment._id}>
                        <div className="flex gap-4 py-2 md:py-3">
                          <img
                            src={`http://localhost:3000/api/images/${comment.userId.profilePicture}`}
                            alt="profilePicture"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                          />
                          <div className="w-full rounded-lg border p-2 md:p-4">
                            <div className="flex items-center justify-between gap-4 w-full">
                              <div className="flex items-center gap-2">
                                <p className="font-bold">
                                  {comment.userId.userName}
                                </p>
                                <span>●</span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                  {formatDate(String(comment.createdAt))}
                                </span>
                              </div>
                              {comment?.userId._id == _id ? (
                                <div className="flex items-center gap-4 text-xl">
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => deleteComment(comment._id)}
                                  >
                                    <AiFillDelete color="red" />
                                  </span>
                                </div>
                              ) : null}
                            </div>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                : null}
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
