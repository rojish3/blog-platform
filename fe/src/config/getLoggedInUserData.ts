// import axios from "axios";
// import { useEffect } from "react";
// import { setToken } from "../features/authSlice";
// import { useDispatch } from "react-redux";
// import Cookies from "universal-cookie";

// const getLoggedInUserData = async () => {
//   const dispatch = useDispatch();
//   const cookies = new Cookies(null, { path: "/" });

//   useEffect(() => {
//     const userToken = cookies.get("token");
//     console.log(userToken);
//     const getUserData = await axios.get(
//       "http://localhost:3000/api/users/getuser"
//     );
//     console.log(getUserData);

//     dispatch(setToken(userToken));
//   }, [cookies, dispatch]);
//   getLoggedInUserData();
// };
