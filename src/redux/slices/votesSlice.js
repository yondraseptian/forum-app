import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
} from '../../utils/api';

// Async Thunks
export const upVoteThreadAsync = createAsyncThunk(
  'votes/upVoteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      const vote = await upVoteThread(threadId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const downVoteThreadAsync = createAsyncThunk(
  'votes/downVoteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      const vote = await downVoteThread(threadId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const neutralizeThreadVoteAsync = createAsyncThunk(
  'votes/neutralizeThreadVote',
  async (threadId, { rejectWithValue }) => {
    try {
      const vote = await neutralizeThreadVote(threadId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const upVoteCommentAsync = createAsyncThunk(
  'votes/upVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      const vote = await upVoteComment(threadId, commentId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const downVoteCommentAsync = createAsyncThunk(
  'votes/downVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      const vote = await downVoteComment(threadId, commentId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const neutralizeCommentVoteAsync = createAsyncThunk(
  'votes/neutralizeCommentVote',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      const vote = await neutralizeCommentVote(threadId, commentId);
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Initial State
const initialState = {
  votingStatus: 'idle',
  error: null,
};

// Slice
const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('votes/upVote'),
        (state) => ({
          ...state,
          votingStatus: 'loading',
          error: null,
        }),
      )
      .addMatcher(
        (action) => action.type.startsWith('votes/downVote'),
        (state) => ({
          ...state,
          votingStatus: 'loading',
          error: null,
        }),
      )
      .addMatcher(
        (action) => action.type.startsWith('votes/neutralize'),
        (state) => ({
          ...state,
          votingStatus: 'loading',
          error: null,
        }),
      )
      .addMatcher(
        (action) => action.type.endsWith('fulfilled'),
        (state) => ({
          ...state,
          votingStatus: 'succeeded',
          error: null,
        }),
      )
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, action) => ({
          ...state,
          votingStatus: 'failed',
          error: action.error.message,
        }),
      );
  },
});

export default votesSlice.reducer;
