import { Link } from "react-router-dom";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { IBlog } from "../types/post.types";

// import { blogData } from "../data/blogData";

const BlogCard: React.FC<{ blog: IBlog }> = ({ blog }) => {
  // console.log(blog);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[blog.date.getMonth()];
  const day = blog.date.getDate();
  const year = blog.date.getFullYear();
  return (
    <>
      {/* <BlogCardSkeleto /> */}

      <div className="relative max-w-sm h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-secondary-darkMode-bg dark:border-gray-700 m-auto my-4 md:my-8 hover:bg-secondary-bg dark:hover:bg-darkMode-bg transition-all duration-300 ease-in-out">
        <img
          className="h-2/5 w-full object-cover rounded-t-lg"
          src="https://static-01.daraz.com.np/p/d6271a012276f7ba4fee8d904e0745d6.jpg_300x0q75.webp"
          alt=""
        />

        <div className="p-5">
          <span className="content-font font-thin text-gray-700 dark:text-gray-400">
            {blog.category}
          </span>
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blog.title.slice(0, 60)}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {blog.content.slice(0, 125)}
          </p>
          <div className="absolute left-0 bottom-0 user-profile flex gap-4 p-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="profilePicture"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-sm">{blog.author}</p>
              <span className="text-gray-600 dark:text-gray-300 text-xs">
                {month} {day}, {year}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-red-700 h-96 w-full max-w-[16rem] lg:h-[32rem] lg:max-w-[24rem] mt-8 m-auto p-2 cursor-pointer hover:bg-secondary-bg dark:hover:bg-secondary-darkMode-bg rounded-md transition-all duration-300 ease-in-out">
        <Link to={`/blogs/${blog.id}`}>
          <img
            className="h-1/2 w-full object-cover rounded-t-md"
            src="https://static-01.daraz.com.np/p/d6271a012276f7ba4fee8d904e0745d6.jpg_300x0q75.webp"
            alt="mobile"
          />
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
            <div className="h-1/2">
              <span className="content-font">{blog.category}</span>

              <h2 className="title-font text-2xl py-4 min-h-22 overflow-hidden line-clamp-2">
                {blog.title}
              </h2>
              <p className="content-font pb-4 min-h-32 overflow-hidden line-clamp-4">
                {blog.content}
              </p>
              <div className="user-profile flex gap-4 my-2 md:my-4">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  alt="profilePicture"
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm">{blog.author}</p>
                  <span className="text-gray-600 text-xs">
                    {month} {day}, {year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div> */}
    </>
  );
};

export default BlogCard;
