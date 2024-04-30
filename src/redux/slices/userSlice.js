import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../utils/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await getUsers();
    return response.users;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice;
