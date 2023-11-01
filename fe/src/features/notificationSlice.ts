import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.push(action.payload);
    },
    clearNotification: (state) => {
      state.length = 0;
    },
  },
});

export const { setNotifications, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
