import { IBlog } from "../types/post.types";

const BlogList: React.FC<{ blog: IBlog }> = ({ blog }) => {
  return (
    <>
      <div className="relative w-[80%] m-auto my-4 flex flex-col sm:flex-row gap-4 md:gap-8items-start bg-white border border-gray-200 rounded-lg shadow dark:bg-secondary-darkMode-bg dark:border-gray-700 md:my-8 transition-all duration-300 ease-in-out">
        <img
          src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
          alt=""
          className="shadow-md rounded-lg bg-slate-50 sm:w-[16rem] md:w-[32rem]"
        />
        <div className="p-4">
          <span className="mb-1 block content-font font-thin text-gray-700 dark:text-gray-400">
            {blog.category}
          </span>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-inherit">
            {blog.title.slice(0, 60)}
          </h3>
          <div className="text-inherit">
            <p>{blog.content.slice(0, 150)}</p>
          </div>
          <a
            className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
            href="https://headlessui.dev"
          >
            Learn more
            <span className="sr-only">
              , Completely unstyled, fully accessible UI components
            </span>
            <svg
              className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
              width="3"
              height="6"
              viewBox="0 0 3 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0L3 3L0 6"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogList;
