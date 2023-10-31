import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-secondary-bg dark:bg-secondary-darkMode-bg px-4 py-4 pb-16 mb:px-12 mb:pb-12 md:pt-8">
      <div className="lg:flex flex-row justify-between items-center">
        <div className="socials text-xl flex gap-3 py-4 lg cursor-pointer">
          <AiFillFacebook />
          <AiOutlineTwitter />
          <AiOutlineInstagram />
        </div>
        <div className="policy flex flex-col gap-4 lg:flex-row lg:gap-8">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Do not sell of share my personal information
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-end lg:gap-8">
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="hover:underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
        <p>&copy; 2023 TechVerse</p>
      </div>
    </div>
  );
};

export default Footer;
