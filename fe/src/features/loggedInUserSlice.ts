import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/user.types";

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string;
}

export const fetchUser = createAsyncThunk<IUser>("user/fetchUser", async () => {
  const response: AxiosResponse<IUser> = await axios.get(
    "http://localhost:3000/api/users/getuser"
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: "",
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
