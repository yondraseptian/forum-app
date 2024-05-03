import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailThreadById, getThreads, createThread } from "../../utils/api";

export const fetchThreads = createAsyncThunk(
  "threads/fetchThreads",
  async () => {
    const response = await getThreads();
    return response.threads;
  }
);

export const fetchThreadsById = createAsyncThunk(
  "threads/fetchThreadsById",
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await getDetailThreadById(threadId);
      return response.detailThread;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createThreadAsync = createAsyncThunk(
  "threads/createThread",
  async (threadData, { rejectWithValue }) => {
    try {
      const response = await createThread(threadData);
      return response.data.thread;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  threads: [],
  detailThread: [],
  status: "idle",
  error: null,
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchThreadsById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThreadsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailThread = [action.payload];
      })
      .addCase(fetchThreadsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createThreadAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createThreadAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.threads.push(action.payload);
      })
      .addCase(createThreadAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default threadsSlice;
