import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { createComment } from '../../../utils/api';

export const createCommentAsync = createAsyncThunk(
  'comment/createCommentAsync',
  async ({ threadId, commentData }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await createComment(threadId, commentData);
      dispatch(hideLoading());
      return response.data.comments;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  comment: null,
  status: 'idle',
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAsync.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(createCommentAsync.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        comment: action.payload,
      }))
      
  },

});

export default commentSlice.reducer;
