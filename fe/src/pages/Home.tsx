import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { blogData } from "../data/blogData";

const Home = () => {
  const navigate = useNavigate();
  const sortedData = blogData.sort((a, b) => b.date - a.date);
  const latestPosts = sortedData.slice(0, 3);
  console.log(latestPosts);
  return (
    <>
      <div>
        <div className="h-screen relative text-black dark:text-darkMode-text bg-center background bg-no-repeat backdrop-brightness-50">
          <NavBar />
          <div className="flex flex-col justify-center items-center h-[70%] gap-4">
            <h1 className="text-3xl font-bold text-center">
              EXPRESS YOURSELF WITH WORDS
            </h1>
            <h3 className="text-xl text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              iste cumque quos!
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-screen p-4 md-p-8">
          <h1 className="text-3xl title-font text-center my-12 underline">
            LATEST BLOGS
          </h1>
          <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
