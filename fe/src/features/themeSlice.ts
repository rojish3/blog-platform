import { createSlice } from "@reduxjs/toolkit";

const themeString = localStorage.getItem("theme");
const initialState = {
  mode: themeString ? JSON.parse(themeString) : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("theme", JSON.stringify(state.mode));
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
