import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import threadsSlice from "./slices/threadsSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
    threads: threadsSlice.reducer,
    users: userSlice.reducer,
  },
});
