import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface ILoginModal {
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<ILoginModal> = ({ loginModal, setLoginModal }) => {
  const navigate = useNavigate();
  if (!loginModal) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <div className="modal-background fixed inset-0 bg-black opacity-50"></div>
        <div className="modal-container relative p-4 border rounded-lg shadow-lg max-w-xl bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
          <div className="flex justify-between items-center">
            <p className="font-bold">Login to continue</p>
            <span className="cursor-pointer">
              <AiOutlineClose onClick={() => setLoginModal(false)} />
            </span>
          </div>
          <p className="text-sm">Login to view the full blog</p>
          <button
            className="px-4 min-w-[250px] mt-4 lg:mt-6 text-blue-700 hover:text-white border-2 border-blue-700 from-[#0F4C81] via-blue-800 to-blue-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
