import NavBar from "../components/NavBar";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  return (
    <>
      <NavBar />
      <div className="">
        <div className="bg-blue-200 py-12 relative w-fulll">
          <div className="text-5xl text-center">EXPLORE BLOGS</div>
          <p className="text-center my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, quaerat. Veritatis, at!
          </p>
          <div className="absolute z-10 left-[50%] -bottom-5 w-[70vw] md:max-w-[50vw]">
            <input
              type="text"
              placeholder="Search Blog"
              className="px-4 py-2 bg-white translate-x-[-50%] h-12 w-full rounded-md shadow-xl focus:outline-2 focus:outline-blue-500"
            />
            {/* <div className="absolute top-2 right-28 z-20 text-2xl">
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
