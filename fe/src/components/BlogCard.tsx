import { Link } from "react-router-dom";

// import { blogData } from "../data/blogData";
interface IBlog {
  id: number;
  title: string;
  date: Date;
  category: string;
  content: string;
  author: string;
}
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
      <div className="h-96 w-full max-w-[16rem] lg:h-[32rem] lg:max-w-[24rem] mt-8 m-auto p-2 cursor-pointer hover:bg-secondary-bg dark:hover:bg-secondary-darkMode-bg rounded-md">
        <Link to={`/blogs/${blog.id}`}>
          <img
            className="h-1/2 w-full object-cover rounded-t-md"
            src="https://static-01.daraz.com.np/p/d6271a012276f7ba4fee8d904e0745d6.jpg_300x0q75.webp"
            alt="mobile"
          />
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
            <div className="h-1/2">
              <span className="content-font">{blog.category}</span> |{" "}
              <span className="content-font">
                {month} {day}, {year}
              </span>
              <h2 className="title-font text-2xl py-4 min-h-22 overflow-hidden line-clamp-2">
                {blog.title}
              </h2>
              <p className="content-font pb-4 min-h-32 overflow-hidden line-clamp-4">
                {blog.content}
              </p>
              <span>{blog.author}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
