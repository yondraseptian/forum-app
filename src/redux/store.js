/* eslint-disable linebreak-style */
import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import threadsSlice from './slices/thread/threadsSlice';
import userSlice from './slices/users/userSlice';
import commentSlice from './slices/comments/commentSlice';
import votesSlice from './slices/votes/votesSlice';
import leaderboardsSlice from './slices/leaderboard/leaderboardSlice';
import authSlice from './slices/authUser/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    threads: threadsSlice,
    users: userSlice,
    comments: commentSlice,
    votes: votesSlice,
    leaderboard: leaderboardsSlice,
    loadingBar: loadingBarReducer,
  },
});
