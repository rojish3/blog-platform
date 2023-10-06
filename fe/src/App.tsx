import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const Login = lazy(() => import("./pages/Login"));
  const Signup = lazy(() => import("./pages/Signup"));
  const Home = lazy(() => import("./pages/Home"));
  const Blogs = lazy(() => import("./pages/Blogs"));
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
