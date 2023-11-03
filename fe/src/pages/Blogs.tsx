import NavBar from "../components/NavBar";
import BlogCard from "../components/BlogCard";
// import { blogData } from "../data/blogData";
import Footer from "../components/Footer";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { IBlog } from "../types/post.types";
import Cookies from "universal-cookie";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import BlogsCards from "../components/BlogsCards";
import BlogListSkeleton from "../components/BlogListSkeleton";
import debounce from "lodash/debounce";
import { defaultBlogRender, BASE_URL } from "../utils/constants";

const Blogs = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [itemView, setItemView] = useState<boolean>(true);
  const [postData, setPostData] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortData, setSortData] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await axios.get(
          `${BASE_URL}/posts?page=${currentPage}&limit=${postsPerPage}&sortBy=${sortData}&category=${selectedCategory}&searchQuery=${searchInput}`
        );
        setPageNumber(posts.data.totalPages);
        const data = posts.data.data;
        setPostData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const debouncedSearch = debounce(getAllPosts, 500);

    if (searchInput !== "") {
      debouncedSearch();
    } else {
      getAllPosts(); // If search query is empty, no debounce
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [currentPage, postsPerPage, searchInput, selectedCategory, sortData]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchInput(query);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // Logic to determine the page numbers
  const pageNumbers = [];
  for (let i = 1; i <= pageNumber; i++) {
    pageNumbers.push(i);
  }

  const handlePostDeletion = (postId: string) => {
    setPostData((prevData) => prevData.filter((post) => post._id !== postId));
  };

  return (
    <>
      <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text min-h-screen w-full">
        <NavBar />
        <div className="relative bg-blue-200 dark:bg-blue-700 py-8 w-full">
          <div className="text-5xl text-center">EXPLORE BLOGS</div>
          <p className="text-center my-2">
            Empowering Ideas, Connecting Minds: Your Gateway to Tech Brilliance!
          </p>
          <div className="absolute -bottom-6 md:-bottom-7 flex justify-center items-center mx-auto w-full">
            <input
              type="text"
              className="w-[300px] md:w-[700px] p-4 h-12 md:h-14 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Blogs..."
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="filter flex md:justify-between flex-col md:flex-row items-center p-4 md:p-8">
          {/* <div className="flex flex-col justify-between items-center w-full mt-3"> */}
          <div className="flex order-1 md:order-1 items-center gap-2 mt-3 md:mt-0 md:gap-4 text-sm md:text-xl bg-secondary-bg dark:bg-secondary-darkMode-bg md:py-1 md:px-2 rounded-md">
            <span
              className={`p-2 cursor-pointer rounded-md hover:scale-105 ${
                itemView ? "bg-gray-300 dark:bg-gray-600" : ""
              }`}
              onClick={() => setItemView(true)}
            >
              <BsFillGridFill />
            </span>
            {"|"}
            <span
              className={`p-2 cursor-pointer rounded-md hover:scale-105 ${
                !itemView ? "bg-gray-300 dark:bg-gray-600" : ""
              }`}
              onClick={() => setItemView(false)}
            >
              <FaList />
            </span>
          </div>
          <div className="flex order-2 md:order-3 justify-end items-center my-2 md:mb-0">
            <select
              className="py-2 px-2 pr-5 block border-gray-200 rounded-lg shadow text-xs md:text-sm font-semibold focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              onChange={(e) => setSortData(e.target.value)}
              defaultValue="latest"
            >
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <ul className="w-full order-3 md:order-2 categories flex overflow-x-auto lg:overflow-x-visible justify-center items-center gap-4 text-xs md:text-base">
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === ""
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              Discover
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === "Artificial Intelligence"
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Artificial Intelligence")}
            >
              Artificial Intelligence
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === "Cloud Computing"
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Cloud Computing")}
            >
              Cloud Computing
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === "Cybersecurity"
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Cybersecurity")}
            >
              Cybersecurity
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === "Digital Marketing"
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Digital Marketing")}
            >
              Digital Marketing
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === "Programming"
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Programming")}
            >
              Programming
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-full hover:bg-white hover:dark:bg-gray-700 ${
                selectedCategory === "Technology"
                  ? "bg-white dark:bg-gray-700 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Technology")}
            >
              Technology
            </li>
          </ul>
          {/* </div> */}
        </div>

        <div>
          {isLoading && itemView ? (
            <div className="flex flex-wrap px-4 md:px-8">
              {defaultBlogRender.map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : isLoading && !itemView ? (
            <div className="w-full md:w-[70%] lg:w-[60%] m-auto">
              {defaultBlogRender.map((_, index) => (
                <BlogListSkeleton key={index} />
              ))}
            </div>
          ) : postData.length > 0 ? (
            <div className="flex w-full flex-wrap justify-around px-4 md:px-8">
              {postData.map((blog) =>
                itemView ? (
                  <BlogCard key={blog._id} blog={blog} />
                ) : (
                  <div
                    key={blog._id}
                    className="w-full md:w-[70%] lg:w-[60%] m-auto"
                  >
                    <BlogsCards
                      key={blog._id}
                      blog={blog}
                      handlePostDeletion={handlePostDeletion}
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-5xl text-center my-48">No Blogs found</div>
          )}
        </div>
        <div className="my-2">
          <ul className="flex justify-center space-x-2">
            {pageNumbers?.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blogs;
