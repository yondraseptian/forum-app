import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getDetailThreadById, getThreads, createThread } from '../../utils/api';

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await getThreads();
      dispatch(hideLoading());
      return response.threads;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error.message);
    }
  },
);

export const fetchThreadsById = createAsyncThunk(
  'threads/fetchThreadsById',
  async (threadId, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await getDetailThreadById(threadId);
      dispatch(hideLoading());
      return response.detailThread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error.message);
    }
  },
);

export const createThreadAsync = createAsyncThunk(
  'threads/createThread',
  async (threadData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await createThread(threadData);
      dispatch(hideLoading());
      return response.data.thread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  threads: [],
  detailThread: [],
  status: 'idle',
  error: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchThreads.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        threads: action.payload,
      }))
      .addCase(fetchThreads.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchThreadsById.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchThreadsById.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        detailThread: [action.payload],
      }))
      .addCase(fetchThreadsById.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createThreadAsync.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(createThreadAsync.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        detailThread: [action.payload],
      }))
      .addCase(createThreadAsync.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default threadsSlice.reducer;
