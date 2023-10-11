import NavBar from "../components/NavBar";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  return (
    <>
      <div className="bg-primary-color text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text w-full">
        <NavBar />
        <div className="bg-blue-200 py-12 relative w-full">
          <div className="text-5xl text-center">EXPLORE BLOGS</div>
          <p className="text-center my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, quaerat. Veritatis, at!
          </p>
        </div>
        <BlogCard />
      </div>
    </>
  );
};

export default Blogs;
