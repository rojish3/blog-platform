import { createSlice } from "@reduxjs/toolkit";

const themeString = localStorage.getItem("darkMode");
if (!themeString) {
  localStorage.setItem("darkMode", JSON.stringify(false));
}
const initialState = {
  mode: themeString ? JSON.parse(themeString) : false,
};

const themeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
