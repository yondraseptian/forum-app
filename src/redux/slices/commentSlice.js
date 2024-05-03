import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createComment } from "../../utils/api";

export const createCommentAsync = createAsyncThunk(
  "comment/createCommentAsync",
  async ({ threadId, commentData }, { rejectWithValue }) => {
    try {
      const response = await createComment(threadId, commentData);
      return response.data.comments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  comment: null,
  status: "idle",
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comment = action.payload;
      })
      .addCase(createCommentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.action = action.error.message;
      });
  },
});

export default commentSlice;
