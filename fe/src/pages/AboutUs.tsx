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
            <p className="text-lg  mb-4">
              Welcome to TechVerse, where the realm of technology meets a
              passionate community of enthusiasts. Our platform is a dedicated
              space for the tech-savvy, the curious, and the innovative minds
              seeking to explore, learn, and connect. At TechVerse, we thrive on
              the belief that knowledge should be shared, explored, and
              celebrated. We are a vibrant community-driven blog application
              committed to delivering insightful, up-to-date content and
              fostering engaging discussions on all things tech-related. We
              cater to a wide spectrum of tech aficionados, from seasoned
              professionals to eager learners, fostering an environment that
              encourages knowledge exchange and collaboration. Our content spans
              across diverse technological domains - be it the latest
              advancements in AI, cybersecurity, software engineering, design
              thinking, or upcoming trends that are shaping our future.
            </p>
            <p className="text-lg mb-4">
              Our mission is simple: to provide a platform that encourages both
              novices and experts to interact, share their insights, and stay
              informed about the ever-evolving world of technology. We're
              devoted to democratizing tech knowledge and creating a space where
              everyone feels empowered to be a part of the conversation. Join
              our growing community, share your expertise, or simply stay
              informed. At TechVerse, we're here to empower, educate, and
              inspire the tech enthusiast in you.
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
