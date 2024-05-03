import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import threadsSlice from "./slices/threadsSlice";
import userSlice from "./slices/userSlice";
import commentSlice from "./slices/commentSlice";
import votesSlice from "./slices/votesSlice";
import leaderboardSlice from "./slices/leaderboardSlice";

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
    threads: threadsSlice.reducer,
    users: userSlice.reducer,
    comments: commentSlice.reducer,
    votes: votesSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
  },
});
