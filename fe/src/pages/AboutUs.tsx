import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const AboutUs = () => {
  return (
    <>
      <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text w-full min-h-screen">
        <NavBar />
        <div className="flex flex-col md:flex-row items-center gap-4 p-2 md:p-8">
          <div className="md:w-[50%]">
            <img
              src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp"
              alt="About Us"
              width={850}
              height={850}
            />
          </div>
          <div className="md:w-[50%]">
            <h1 className="text-5xl font-bold mb-8">About Us</h1>
            <p className="text-xl mb-4">
              Our blog is a place where we share our thoughts and ideas on a
              variety of topics, including technology, business, and lifestyle.
              We are passionate about sharing knowledge and helping others learn
              and grow.
            </p>
            <p className="text-lg mb-4">
              We believe that everyone has something valuable to share, and we
              encourage our readers to leave comments and feedback on our posts.
              We hope that our blog can be a forum for discussion and learning,
              and that it can help our readers to connect with others who share
              their interests.
            </p>
            <p className="text-lg">
              Thank you for visiting our blog! We hope you enjoy reading our
              posts.
            </p>
          </div>
        </div>
        <div className="mt-7">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
