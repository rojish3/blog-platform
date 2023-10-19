import NavBar from "../components/NavBar";
import BlogCard from "../components/BlogCard";
import { blogData } from "../data/blogData";
import Footer from "../components/Footer";
import BlogList from "../components/BlogList";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import BlogCardSkeleton from "../components/BlogCardSkeleton";

const Blogs = () => {
  const [itemView, setItemView] = useState<boolean>(true);
  return (
    <>
      <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text w-full">
        <NavBar />
        <div className="bg-blue-200 dark:bg-blue-700 py-12 relative w-full">
          <div className="text-5xl text-center">EXPLORE BLOGS</div>
          <p className="text-center my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, quaerat. Veritatis, at!
          </p>
        </div>
        <div className="filter flex md:justify-between flex-col-reverse md:flex-row items-center p-4 md:p-8">
          <div className="flex items-center gap-2 md:gap-4 text-xl md:text-2xl bg-secondary-bg dark:bg-secondary-darkMode-bg py-1 px-2 rounded-md">
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
          <ul className="w-full categories flex overflow-x-auto md:overflow-x-visible justify-center items-center gap-4 text-sm md:text-base">
            <li className="cursor-pointer hover:font-semibold hover:bg-white hover:dark:bg-gray-700 px-2 py-1 rounded-full">
              Discover
            </li>
            <li className="cursor-pointer hover:font-semibold hover:bg-white hover:dark:bg-gray-700 px-2 py-1 rounded-full">
              Art and Design
            </li>
            <li className="cursor-pointer hover:font-semibold hover:bg-white hover:dark:bg-gray-700 px-2 py-1 rounded-full">
              Business
            </li>
            <li className="cursor-pointer hover:font-semibold hover:bg-white hover:dark:bg-gray-700 px-2 py-1 rounded-full">
              Lifestyle
            </li>
            <li className="cursor-pointer hover:font-semibold hover:bg-white hover:dark:bg-gray-700 px-2 py-1 rounded-full">
              News
            </li>
            <li className="cursor-pointer hover:font-semibold hover:bg-white hover:dark:bg-gray-700 px-2 py-1 rounded-full">
              Technology
            </li>
          </ul>

          <div className="sort flex justify-end items-center mb-4 md:mb-0">
            <select className="py-2 px-2 pr-5 block border-gray-200 rounded-lg shadow text-sm font-semibold focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
              <option defaultValue="popular">Popular</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap p-4 md:p-8">
          {blogData.map((blog) =>
            itemView ? (
              <BlogCard key={blog.id} blog={blog} />
            ) : (
              <BlogList key={blog.id} blog={blog} />
            )
          )}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blogs;
