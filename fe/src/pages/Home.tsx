import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="h-screen text-primary-text dark:text-darkMode-tex bg-center bg-no-repeat background">
          <NavBar />
          <div className="flex flex-col justify-center items-center h-[70%] gap-4">
            <h1 className="text-3xl text-center">
              EXPRESS YOURSELF WITH WORDS
            </h1>
            <h3 className="text-xl text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              iste cumque quos!
            </h3>
            <button
              className="text-xl bg-blue-500 px-4 py-2 rounded-md"
              onClick={() => navigate("/blogs")}
            >
              Explore More
            </button>
          </div>
        </div>
        <div className="h-screen">
          <h1 className="text-3xl title-font text-center mt-8">LATEST BLOGS</h1>
          <hr className="w-[20%] m-auto" />
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
        <div className="h-screen"></div>
      </div>
    </>
  );
};

export default Home;
