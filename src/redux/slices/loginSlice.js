import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../utils/api";

export const loginUserAsync = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginUser({ email, password });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: localStorage.getItem("token") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // alert(action.payload);
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice;
