import { AiOutlineMenu } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsSun, BsMoon, BsTerminal, BsBell } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import SideBar from "./SideBar";
import Cookies from "universal-cookie";
import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";
import { clearNotification } from "../features/notificationSlice";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");

interface AppState {
  theme: boolean;
}

const NavBar = () => {
  const { mode }: any = useSelector((state: AppState) => state.theme);
  const notification: string[] = useSelector(
    (state: RootState) => state.notification
  );

  const user = useSelector((state: RootState) => state.loggedInUser);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  // const [notifications, setNotifications] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // useEffect(() => {
  //   socket.on("new-like", (message) => {
  //     console.log(message);
  //     // setNotifications(message);
  //     return () => {
  //       socket.disconnect();
  //     };
  //   });
  // }, []);
  // console.log(notifications);

  useEffect(() => {
    const darkModeToggle = document.getElementById("data-mode");
    if (mode) {
      darkModeToggle?.classList.add("dark");
    } else {
      darkModeToggle?.classList.remove("dark");
    }
  }, [mode]);

  //Window scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`sticky w-full top-0 left-0 z-50 h-[10vh] flex justify-between items-center p-4 md:p-6 border-b border-slate-300 dark:border-slate-700 ${
          scrolled && mode
            ? "bg-darkMode-bg text-darkMode-text bg-opacity-90 transition-all ease-in-out duration-200"
            : scrolled && !mode
            ? "bg-primary-bg text-primary-text bg-opacity-90 transition-all ease-in-out duration-200"
            : "bg-transparent"
        }`}
      >
        <div
          className=" cursor-pointer font-sans text-xl md:text-3xl flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <span className="md:hidden">
            <BsTerminal size={38} />
          </span>
          <span className="hidden md:flex md:items-center md:gap-2">
            TechVerse <BsTerminal size={34} />
          </span>
          {/* <span className="md:hidden">
            <BsTerminal size={38} />
          </span>
          <img src={Logo} alt="logo" className="hidden md:block" /> */}
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
              <NavLink
                to="/aboutus"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 underline rounded-lg font-bold transition-all duration-200 ease-in-out"
                    : "hover:text-blue-600 font-semibold"
                }
              >
                ABOUT US
              </NavLink>
            </li>

            <div className="md:block cursor-pointer hover:scale-110 transition-all duration-100 ">
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
            {token ? (
              <div className="flex items-center gap-8">
                <div className="relative cursor-pointer">
                  {notification.length > 0 ? (
                    <div className="absolute left-0 top-0 bg-red-500 rounded-full">
                      <span className="text-xs text-white p-1">
                        {notification.length}
                      </span>
                    </div>
                  ) : null}

                  <div className="p-2" onClick={() => setOpen(!open)}>
                    <BsBell size={24} />
                  </div>
                  {open ? (
                    <div className="absolute border max-w-xl z-50 w-56 h-auto flex flex-col gap-2 p-2 shadow-lg rounded-lg mt-5 bg-secondary-bg text-primary-text dark:bg-secondary-darkMode-bg dark:text-darkMode-text">
                      {/* Notifications: */}
                      <ul>
                        {notification.map((noti, index) => (
                          <li key={index}>{noti}</li>
                        ))}
                      </ul>
                      {notification.length > 0 ? (
                        <button
                          className="hover:bg-gray-500 rounded-full py-1"
                          onClick={() => {
                            dispatch(clearNotification());
                            setOpen(false);
                          }}
                        >
                          clear
                        </button>
                      ) : (
                        <p>No new Notifications</p>
                      )}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => navigate("/new")}
                >
                  Create Post
                </button>
                <img
                  src={`http://localhost:3000/api/images/${user?.profilePicture}`}
                  alt="profilePicture"
                  className="h-12 w-12 rounded-full object-cover cursor-pointer"
                  onClick={() => setDropdown(true)}
                />
              </div>
            ) : (
              <button
                type="button"
                className="text-white bg-gradient-to-r from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            )}
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
          {token ? (
            <div className="flex items-center gap-2">
              <div className="relative cursor-pointer">
                {notification.length > 0 ? (
                  <div className="absolute left-0 top-0 bg-red-500 rounded-full">
                    <span className="text-xs text-white p-1">
                      {notification.length}
                    </span>
                  </div>
                ) : null}

                <div className="p-2" onClick={() => setOpen(!open)}>
                  <BsBell size={24} />
                </div>
                {open ? (
                  <div className="absolute border max-w-xl z-50 w-56 h-auto flex flex-col gap-2 p-2 shadow-lg rounded-lg mt-5 bg-secondary-bg text-primary-text dark:bg-secondary-darkMode-bg dark:text-darkMode-text">
                    {/* Notifications: */}
                    <ul>
                      {notification.map((noti, index) => (
                        <li key={index}>{noti}</li>
                      ))}
                    </ul>
                    {notification.length > 0 ? (
                      <button
                        className="hover:bg-gray-500 rounded-full py-1"
                        onClick={() => {
                          dispatch(clearNotification());
                          setOpen(false);
                        }}
                      >
                        clear
                      </button>
                    ) : (
                      <p>No new Notifications</p>
                    )}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                className="px-3 text-blue-700 hover:text-white border border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-lg p-2 text-center transition-all ease-in-out duration-300"
                onClick={() => navigate("/new")}
              >
                <FaEdit />
              </button>
              <img
                src={`http://localhost:3000/api/images/${user?.profilePicture}`}
                alt="profilePicture"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
              />
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 underline rounded-lg font-bold transition-all duration-200 ease-in-out"
                  : "hover:text-blue-600 font-semibold"
              }
            >
              <button
                type="button"
                className="p-2 text-blue-700 hover:text-white border border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 rounded-lg text-xs text-center transition-all ease-in-out duration-300"
              >
                Log in
              </button>
            </NavLink>
          )}

          <div
            className="space-y-2 cursor-pointer"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <AiOutlineMenu size={25} />
          </div>
        </section>
      </nav>
      <ProfileDropdown dropdown={dropdown} setDropdown={setDropdown} />
    </>
  );
};
export default NavBar;
