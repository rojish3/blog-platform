import NavBar from "../components/NavBar";
import Profile from "../components/Profile";

const UserProfile = () => {
  return (
    <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text min-h-screen">
      <NavBar />
      <Profile />
    </div>
  );
};

export default UserProfile;
