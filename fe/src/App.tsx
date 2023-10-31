import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/loggedInUserSlice";
import Cookies from "universal-cookie";
import UserProfile from "./pages/UserProfile";
import Error from "./pages/Error";
import axios from "axios";
import ChangePassword from "./components/ChangePassword";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

interface AppState {
  theme: boolean;
}

const App = () => {
  const { mode }: any = useSelector((state: AppState) => state.theme);
  const toastTheme = mode ? "dark" : "light";
  const [notifications, setNotifications] = useState<any[]>([]);
  const Login = lazy(() => import("./pages/Login"));
  const Signup = lazy(() => import("./pages/Signup"));
  const ResetPassword = lazy(() => import("./pages/ResetPassword"));
  const Home = lazy(() => import("./pages/Home"));
  const Blogs = lazy(() => import("./pages/Blogs"));
  const AboutUs = lazy(() => import("./pages/AboutUs"));
  const BlogPost = lazy(() => import("./pages/BlogPost"));
  const CreatePost = lazy(() => import("./components/CreatePost"));
  const EditPost = lazy(() => import("./components/EditPost"));
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const userFromLocalStorage = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    socket.on("new-like", (notification) => {
      setNotifications((prevNotifications) => {
        return prevNotifications
          ? [notification, ...prevNotifications]
          : [notification];
      });
    });
    console.log(notifications);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch user data from local storage
    const getUserData = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:3000/api/users/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (userResponse.status == 200) {
          const user = userResponse.data;
          socket.emit("user", user.userName);
          // console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
          const loggedInUserInfoString = localStorage.getItem("user");
          const loggedInUserInfo = loggedInUserInfoString
            ? JSON.parse(loggedInUserInfoString)
            : null;

          if (loggedInUserInfo || userFromLocalStorage) {
            dispatch(setUser(loggedInUserInfo));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [dispatch, token, userFromLocalStorage]);

  return (
    <>
      <ToastContainer position="top-left" autoClose={1000} theme={toastTheme} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense>
                <Signup />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          ></Route>
          <Route
            path="/reset-password"
            element={
              <Suspense>
                <ResetPassword />
              </Suspense>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/blogs"
            element={
              <Suspense>
                <Blogs />
              </Suspense>
            }
          ></Route>
          <Route
            path="/aboutus"
            element={
              <Suspense>
                <AboutUs />
              </Suspense>
            }
          ></Route>
          {token ? (
            <>
              <Route
                path="/new"
                element={
                  <Suspense>
                    <CreatePost />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/edit/:id"
                element={
                  <Suspense>
                    <EditPost />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/blogs/:id"
                element={
                  <Suspense>
                    <BlogPost />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <Suspense>
                    <UserProfile />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/settings"
                element={
                  <Suspense>
                    <ChangePassword />
                  </Suspense>
                }
              ></Route>
            </>
          ) : null}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
