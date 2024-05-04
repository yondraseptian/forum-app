import { configureStore } from "@reduxjs/toolkit";
import threadsSlice from "./slices/threadsSlice";
import userSlice from "./slices/userSlice";
import commentSlice from "./slices/commentSlice";
import votesSlice from "./slices/votesSlice";
import leaderboardsSlice from "./slices/leaderboardSlice";
import authSlice from "./slices/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    threads: threadsSlice.reducer,
    users: userSlice.reducer,
    comments: commentSlice.reducer,
    votes: votesSlice.reducer,
    leaderboard: leaderboardsSlice.reducer,
  },
});
