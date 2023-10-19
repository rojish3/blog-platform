import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import userReducer from "../features/loggedInUserSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
