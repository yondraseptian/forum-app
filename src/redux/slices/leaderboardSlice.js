import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLeaderBoard } from "../../utils/api";

export const fetchLeaderBoard = createAsyncThunk(
  "leaderboard/fetchLeaderBoard",
  async () => {
    try {
      const leaderboard = await getLeaderBoard();
      return leaderboard;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  leaderboard: [],
  status: "idle",
  error: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
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
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default leaderboardSlice;
