const Error = () => {
  return (
    <>
      <section className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <a
              href="/"
              className="w-full min-w-[350px] mt-4 lg:mt-8 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
