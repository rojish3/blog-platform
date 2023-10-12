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
  console.log(blog);
  return (
    <>
      <div className="h-96 w-full max-w-[16rem] lg:h-[32rem] lg:max-w-[24rem] mt-8 m-auto p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
        <img
          className="h-1/2 w-full object-cover rounded-md"
          src="https://static-01.daraz.com.np/p/d6271a012276f7ba4fee8d904e0745d6.jpg_300x0q75.webp"
          alt="mobile"
        />
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
          <div className="h-1/2">
            <span className="content-font">{blog.category}</span> |{" "}
            {/* <span className="content-font">{blog.date}</span> */}
            <h2 className="title-font text-2xl">{blog.title}</h2>
            <p className="content-font">{blog.content}</p>
            <span>{blog.author}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
