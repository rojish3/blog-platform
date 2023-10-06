import { AiOutlineMenu } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { useNavigate } from "react-router-dom";

interface AppState {
  theme: boolean;
}
const NavBar = () => {
  const { mode } = useSelector((state: AppState) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between p-4 md:p-8">
        <div className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
          Blog
        </div>
        <div className="flex gap-4 md:hidden">
          {mode ? (
            <div
              className="cursor-poiner"
              //   style={{
              //     backgroundColor: mode ? "black" : "white",
              //   }}
              onClick={() => dispatch(toggleTheme())}
            >
              <BsMoon />
            </div>
          ) : (
            <div
              className="cursor-poiner"
              //   style={{ backgroundColor: mode ? "black" : "white" }}
              onClick={() => dispatch(toggleTheme())}
            >
              <BsSun />
            </div>
          )}
          <div className="cursor-poiner">
            <AiOutlineMenu />
          </div>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-12">
            <li>
              <a className="cursor-pointer" onClick={() => navigate("/")}>
                HOME
              </a>
            </li>
            <li>
              <a className="cursor-pointer" onClick={() => navigate("/blogs")}>
                BLOGS
              </a>
            </li>
            <li>
              <a className="cursor-pointer">ABOUT US</a>
            </li>
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
      </nav>
    </>
  );
};

export default NavBar;
