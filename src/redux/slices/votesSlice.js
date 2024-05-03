import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
} from "../../utils/api.js";

// Async Thunks
export const upVoteThreadAsync = createAsyncThunk(
  "votes/upVoteThread",
  async (threadId, { rejectWithValue }) => {
    try {
      const vote = await upVoteThread(threadId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downVoteThreadAsync = createAsyncThunk(
  "votes/downVoteThread",
  async (threadId, { rejectWithValue }) => {
    try {
      const vote = await downVoteThread(threadId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const neutralizeThreadVoteAsync = createAsyncThunk(
  "votes/neutralizeThreadVote",
  async (threadId, { rejectWithValue }) => {
    try {
      const vote = await neutralizeThreadVote(threadId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const upVoteCommentAsync = createAsyncThunk(
  "votes/upVoteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const vote = await upVoteComment(commentId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downVoteCommentAsync = createAsyncThunk(
  "votes/downVoteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const vote = await downVoteComment(commentId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const neutralizeCommentVoteAsync = createAsyncThunk(
  "votes/neutralizeCommentVote",
  async (commentId, { rejectWithValue }) => {
    try {
      const vote = await neutralizeCommentVote(commentId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  votingStatus: "idle",
  error: null,
};

// Slice
const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("votes/upVote"),
        (state) => {
          state.votingStatus = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("votes/downVote"),
        (state) => {
          state.votingStatus = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("votes/neutralize"),
        (state) => {
          state.votingStatus = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("fulfilled"),
        (state) => {
          state.votingStatus = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.votingStatus = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default votesSlice;
