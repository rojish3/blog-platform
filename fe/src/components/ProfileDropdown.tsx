import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { FaKey } from "react-icons/fa";

interface IDropdown {
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AppState {
  theme: boolean;
}
const ProfileDropdown: React.FC<IDropdown> = ({ dropdown, setDropdown }) => {
  const { mode }: any = useSelector((state: AppState) => state.theme);
  const user = useSelector((state: RootState) => state.loggedInUser);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const toastTheme = mode ? "dark" : "light";
  // const dispatch = useDispatch();
  // const darkMode = useSelector((state) => state.theme.darkMode);
  // const toggleTheme = () => {
  //   dispatch(toggleDarkMode());
  // };

  const handleLogout = () => {
    cookies.remove("token");
    localStorage.clear();
    toast.success("Logout Successful", {
      position: "top-left",
      autoClose: 800,
      theme: toastTheme,
    });
    setTimeout(() => {
      navigate("/login");
    }, 800);
  };
  return (
    <>
      {dropdown && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end"
          onClick={() => setDropdown(false)}
        >
          <div
            className="relative border max-w-xl inset-0 z-50 w-56 h-auto flex flex-col gap-2 p-2 shadow-lg rounded-lg mt-20 top-30 right-4 bg-secondary-bg text-primary-text dark:bg-secondary-darkMode-bg dark:text-darkMode-text"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-4 cursor-pointer p-2 border-b-2 rounded-t-lg hover:bg-gray-200 hover:dark:bg-darkMode-bg"
              onClick={() => navigate("/profile")}
            >
              <img
                className="w-12 h-12 border border-black rounded-full object-cover"
                src={`http://localhost:3000/api/images/${user.profilePicture}`}
                alt="profile picture"
              />
              <span>{user?.name}</span>
            </div>
            <div
              className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:dark:bg-darkMode-bg"
              onClick={() => navigate("/settings")}
            >
              <FaKey />
              <span>Change Password</span>
            </div>
            <div
              className="flex items-center gap-4 p-2 rounded-lg text-red-600 cursor-pointer hover:bg-gray-200 hover:dark:bg-darkMode-bg"
              onClick={handleLogout}
            >
              <LuLogOut />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
