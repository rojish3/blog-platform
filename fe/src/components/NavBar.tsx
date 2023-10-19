import { AiOutlineMenu } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";

interface AppState {
  theme: boolean;
}

const NavBar = () => {
  const { mode }: any = useSelector((state: AppState) => state.theme);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getLoggedInUserData = async () => {
  //     try {
  //       const userData = await axios.get(
  //         "http://localhost:3000/api/users/getuser"
  //       );
  //       console.log(userData);
  //     } catch (error: any) {
  //       if (error) {
  //         return error;
  //       }
  //     }
  //     getLoggedInUserData;
  //   };
  // }, []);

  useEffect(() => {
    const darkModeToggle = document.getElementById("data-mode");
    if (mode) {
      darkModeToggle?.classList.add("dark");
    } else {
      darkModeToggle?.classList.remove("dark");
    }
  }, [mode]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position, for example, 100px from the top
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get token from cookies
  // useEffect(() => {
  //   type Cookies = {
  //     [key: string]: string;
  //   };
  //   const cookies: Cookies = {};
  //   const allCookies = document.cookie;
  //   const cookieArray = allCookies.split("; ");
  //   for (const cookie of cookieArray) {
  //     const [name, value] = cookie.split("=");
  //     cookies[name] = value;
  //   }
  //   const token = cookies.token;
  //   console.log("Token:", token);
  // }, []);

  return (
    <>
      <nav
        className={`sticky w-full top-0 left-0 z-10 h-[10vh] flex justify-between items-center p-4 md:p-6 ${
          scrolled && mode
            ? "bg-darkMode-bg text-darkMode-text bg-opacity-90 transition-all ease-in-out duration-200"
            : scrolled && !mode
            ? "bg-primary-bg text-primary-text bg-opacity-90 transition-all ease-in-out duration-200"
            : "" // Add your CSS class for the background color change here
        }`}
      >
        <div className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
          Bloghub
        </div>

        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 underline rounded-lg font-bold transition-all duration-200 ease-in-out"
                    : "hover:text-blue-600 font-semibold"
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 underline rounded-lg font-bold transition-all duration-200 ease-in-out"
                    : "hover:text-blue-600 font-semibold"
                }
              >
                BLOGS
              </NavLink>
            </li>
            <li>
              <a className="cursor-pointer">ABOUT US</a>
            </li>

            <div className="md:block cursor-pointer hover:scale-110 transition-all duration-200 ">
              {mode ? (
                <div
                  className="cursor-poiner"
                  onClick={() => dispatch(toggleTheme())}
                >
                  <BsMoon size={24} />
                </div>
              ) : (
                <div
                  className="cursor-poiner"
                  onClick={() => dispatch(toggleTheme())}
                >
                  <BsSun size={24} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-8">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => navigate("/new")}
              >
                Create Post
              </button>
              {/* <img
                src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                alt="profilePicture"
                className="h-12 w-12 rounded-full object-cover cursor-pointer"
              /> */}
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </ul>
        </div>
        {/* Mobile Burger Menu */}
        <section className="flex items-center gap-6 md:hidden">
          <div className="md:block">
            {mode ? (
              <div
                className="cursor-poiner"
                onClick={() => dispatch(toggleTheme())}
              >
                <BsMoon size={24} />
              </div>
            ) : (
              <div
                className="cursor-poiner"
                onClick={() => dispatch(toggleTheme())}
              >
                <BsSun size={24} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-4 text-blue-700 hover:text-white border border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center transition-all ease-in-out duration-300"
              onClick={() => navigate("/new")}
            >
              <FaEdit />
            </button>
            <img
              src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="profilePicture"
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
            />
          </div>

          <div
            className="space-y-2"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <AiOutlineMenu size={25} />
          </div>
        </section>
      </nav>
    </>
  );
};

export default NavBar;
