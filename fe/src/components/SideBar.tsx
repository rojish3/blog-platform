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
        <div className="z-50 bg-white">
          <div className={showSidebar ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-1 right-0 px-4 py-4"
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
                {/* <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 underline rounded-lg font-bold transition-all duration-200 ease-in-out"
                      : "hover:text-blue-600 font-semibold"
                  }
                > */}
                ABOUT US
                {/* </NavLink> */}
              </li>
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
                position: absolute;
                width: 100%;
                height: 100vh;
                top: 0;
                left: 0;
                background: white;
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
