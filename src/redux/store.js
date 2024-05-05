/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import threadsSlice from './slices/threadsSlice';
import userSlice from './slices/userSlice';
import commentSlice from './slices/commentSlice';
import votesSlice from './slices/votesSlice';
import leaderboardsSlice from './slices/leaderboardSlice';
import authSlice from './slices/authSlice';

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
