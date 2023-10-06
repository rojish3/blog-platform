import { AiOutlineSearch } from "react-icons/ai";

import NavBar from "../components/NavBar";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  return (
    <>
      <NavBar />
      <div className="">
        <div className="bg-blue-200 py-12 relative">
          <div className="text-5xl text-center">EXPLORE BLOGS</div>
          <p className="text-center my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, quaerat. Veritatis, at!
          </p>
          <div className="absolute z-20 left-[50%] -bottom-7 w-full">
            <input
              type="text"
              placeholder="Search Blog"
              className="px-8 py-4 bg-white translate-x-[-50%] w-[40%] rounded-md shadow-xl"
            />
            {/* <div className="absolute top-0 z-20 text-3xl">
              <AiOutlineSearch />
            </div> */}
          </div>
        </div>
        <BlogCard />
      </div>
    </>
  );
};

export default Blogs;
