import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";

interface ISidebar {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar: React.FC<ISidebar> = ({ showSidebar, setShowSidebar }) => {
  if (showSidebar) {
    return (
      <>
        <div className="z-50 bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
          <div className={showSidebar ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-3 right-0 px-4 py-4"
              onClick={() => setShowSidebar(false)}
            >
              <AiOutlineClose size={25} />
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="my-8 uppercase">
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
              <li className="my-8 uppercase">
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
              <li className="my-8 uppercase">
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
              {/* <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 underline rounded-lg font-bold transition-all duration-200 ease-in-out"
                    : "hover:text-blue-600 font-semibold"
                }
              >
                <button
                  type="button"
                  className="px-4 mt-4 w-28 text-blue-700 hover:text-white border border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-xl rounded-lg text-xl p-3 text-center mb-2 transition-all ease-in-out duration-300"
                >
                  Log in
                </button>
              </NavLink> */}
            </ul>
          </div>
        </div>
        <style>
          {`
            .hideMenuNav {
                display: none;
            }
            .showMenuNav {
                display: block;
                position: fixed;
                width: 100%;
                height: 100vh;
                top: 0;
                left: 0;
                background: inherit;
                z-index: 10;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            `}
        </style>
      </>
    );
  }
};

export default SideBar;
