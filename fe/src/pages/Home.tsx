import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { IBlog } from "../types/post.types";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
// import { useSelector } from "react-redux";
// import { RootState } from "../app/store";
// import { IUser } from "../types/user.types";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");

const Home = () => {
  // const user: IUser = useSelector((state: RootState) => state.loggedInUser);
  const navigate = useNavigate();
  const [postData, setPostData] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await axios.get(`http://localhost:3000/api/posts`);
        // console.log(posts);
        const data = posts.data.data;
        setPostData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);
  const sortedByNewest = postData
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  // const sortedData = postData.sort(
  //   (a: { createdAt: any }, b: { createdAt: any }) => b.createdAt - a.createdAt
  // );
  const latestPosts = sortedByNewest.slice(0, 3);

  return (
    <>
      <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
        <NavBar />
        <div
          className={`h-[90vh] bg-cover bg-center background bg-no-repeat backdrop-brightness-50 dark:backdrop-brightness-50`}
        >
          <div className="flex flex-col justify-center items-center h-[70%] gap-4">
            <h1 className="text-6xl font-bold text-center">
              Inspiring Tech Discoveries, One Byte at a Time!
            </h1>
            <h3 className="text-xl text-center">
              Empowering Ideas, Connecting Minds: Your Gateway to Tech
              Brilliance!
            </h3>
            <button
              type="button"
              onClick={() => navigate("/blogs")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Explore More
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="min-h-screen p-4 md:p-8">
          <h1 className="text-3xl title-font text-center my-12 underline">
            LATEST BLOGS
          </h1>
          {isLoading ? (
            <div className="flex w-full flex-wrap justify-around px-4 md:px-8">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))}
            </div>
          ) : (
            <div className="flex w-full flex-wrap justify-around px-4 md:px-8">
              {latestPosts.map((post: IBlog) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
          )}
        </div>
        <div className="min-h-screen text-inherit bg-gray-200 dark:bg-[#121212] flex flex-col md:flex-row items-center gap-4 p-4 md:p-8">
          <div className="md:w-[50%]">
            <img
              src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp"
              alt="About Us"
              width={850}
              height={850}
            />
          </div>
          <div className="md:w-[50%]">
            <h1 className="text-5xl font-bold mb-8">About Us</h1>
            <p className="text-xl mb-4">
              Welcome to TechVerse, where the realm of technology meets a
              passionate community of enthusiasts. Our platform is a dedicated
              space for the tech-savvy, the curious, and the innovative minds
              seeking to explore, learn, and connect. At TechVerse, we thrive on
              the belief that knowledge should be shared, explored, and
              celebrated. We are a vibrant community-driven blog application
              committed to delivering insightful, up-to-date content and
              fostering engaging discussions on all things tech-related. We
              cater to a wide spectrum of tech aficionados, from seasoned
              professionals to eager learners, fostering an environment that
              encourages knowledge exchange and collaboration.
            </p>
            <p className="text-lg mb-4">
              Our content spans across diverse technological domains - be it the
              latest advancements in AI, cybersecurity, software engineering,
              design thinking, or upcoming trends that are shaping our future.
            </p>
            <p className="text-lg">
              Thank you for visiting our blog! We hope you enjoy reading our
              posts.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
