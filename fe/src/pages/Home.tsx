import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen home-bg">
        <NavBar />
        <div className="flex flex-col justify-center items-center h-[70%] gap-4">
          <h1 className="text-3xl">EXPRESS YOURSELF WITH WORDS</h1>
          <h3 className="text-xl text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            iste cumque quos!
          </h3>
          <button
            className="text-xl bg-blue-500 px-4 py-2 rounded-md"
            onClick={() => navigate("/blogs")}
          >
            Explore More
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
