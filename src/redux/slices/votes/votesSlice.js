import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
} from '../../../utils/api';

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
      .addCase(upVoteThreadAsync.pending, (state) => {
        state.votingStatus = 'loading';
        state.error = null;
      })
      .addCase(upVoteThreadAsync.fulfilled, (state) => {
        state.votingStatus = 'succeeded';
        state.error = null;
      })
      .addCase(upVoteThreadAsync.rejected, (state, action) => {
        state.votingStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(downVoteThreadAsync.pending, (state) => {
        state.votingStatus = 'loading';
        state.error = null;
      })
      .addCase(downVoteThreadAsync.fulfilled, (state) => {
        state.votingStatus = 'succeeded';
        state.error = null;
      })
      .addCase(downVoteThreadAsync.rejected, (state, action) => {
        state.votingStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(neutralizeThreadVoteAsync.pending, (state) => {
        state.votingStatus = 'loading';
        state.error = null;
      })
      .addCase(neutralizeThreadVoteAsync.fulfilled, (state) => {
        state.votingStatus = 'succeeded';
        state.error = null;
      })
      .addCase(neutralizeThreadVoteAsync.rejected, (state, action) => {
        state.votingStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(upVoteCommentAsync.pending, (state) => {
        state.votingStatus = 'loading';
        state.error = null;
      })
      .addCase(upVoteCommentAsync.fulfilled, (state) => {
        state.votingStatus = 'succeeded';
        state.error = null;
      })
      .addCase(upVoteCommentAsync.rejected, (state, action) => {
        state.votingStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(downVoteCommentAsync.pending, (state) => {
        state.votingStatus = 'loading';
        state.error = null;
      })
      .addCase(downVoteCommentAsync.fulfilled, (state) => {
        state.votingStatus = 'succeeded';
        state.error = null;
      })
      .addCase(downVoteCommentAsync.rejected, (state, action) => {
        state.votingStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(neutralizeCommentVoteAsync.pending, (state) => {
        state.votingStatus = 'loading';
        state.error = null;
      })
      .addCase(neutralizeCommentVoteAsync.fulfilled, (state) => {
        state.votingStatus = 'succeeded';
        state.error = null;
      })
      .addCase(neutralizeCommentVoteAsync.rejected, (state, action) => {
        state.votingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});


export default votesSlice.reducer;
