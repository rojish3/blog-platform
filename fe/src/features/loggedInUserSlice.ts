import { createSlice } from "@reduxjs/toolkit";

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IUser } from "../types/user.types";

// interface LoggedInUserState {
//   user: IUser | null; // user can be of type User or null
// }

// const initialState: LoggedInUserState = {
//   user: null,
// };

// const loggedInUserSlice = createSlice({
//   name: "loggedInUser",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<IUser>) => {
//       state.user = action.payload;
//     },
//     clearUser: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, clearUser } = loggedInUserSlice.actions;
// export default loggedInUserSlice.reducer;
