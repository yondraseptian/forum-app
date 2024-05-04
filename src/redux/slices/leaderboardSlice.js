import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLeaderBoard } from "../../utils/api";

export const fetchLeaderBoard = createAsyncThunk(
  "leaderboards/fetchLeaderBoard",
  async () => {
    try {
      const leaderboards = await getLeaderBoard();
      return leaderboards;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  leaderboards: [],
  status: "idle",
  error: null,
};

const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderBoard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLeaderBoard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaderboards = action.payload;
      })
      .addCase(fetchLeaderBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default leaderboardsSlice;
