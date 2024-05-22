import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getLeaderBoard } from '../../../utils/api';

export const fetchLeaderBoard = createAsyncThunk(
  'leaderboards/fetchLeaderBoard',
  async (_, { dispatch }) => {
    try {
      dispatch(showLoading());
      const leaderboards = await getLeaderBoard();
      dispatch(hideLoading());
      return leaderboards;
    } catch (error) {
      dispatch(hideLoading());
      throw new Error(error.message);
    }
  },
);

const initialState = {
  leaderboards: [],
  status: 'idle',
  error: null,
};

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderBoard.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchLeaderBoard.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        leaderboards: action.payload,
      }))
      .addCase(fetchLeaderBoard.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },

});

export default leaderboardsSlice.reducer;
