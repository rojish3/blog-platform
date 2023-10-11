import { AiOutlineMenu } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { set } from "zod";
import SideBar from "./SideBar";

interface AppState {
  theme: boolean;
}

const NavBar = () => {
  const { mode }: any = useSelector((state: AppState) => state.theme);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  useEffect(() => {
    const darkModeToggle = document.getElementById("data-mode");
    if (mode) {
      darkModeToggle?.classList.add("dark");
    } else {
      darkModeToggle?.classList.remove("dark");
    }
  }, [mode]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <nav className="sticky top-0 left-0 z-10 h-[10vh] flex justify-between items-center p-4 md:p-6">
        <div className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
          Blog
        </div>

        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="hidden md:block">
          <ul className="flex items-center gap-12">
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
            <div className="md:block cursor-pointer">
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
            <li>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </li>
            {/* <li>
              <a className="cursor-pointer" onClick={() => navigate("/signup")}>
                Sign up
              </a>
            </li> */}
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
