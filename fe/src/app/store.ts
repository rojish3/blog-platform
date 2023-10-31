import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import loggedInUserReducer from "../features/loggedInUserSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    loggedInUser: loggedInUserReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
