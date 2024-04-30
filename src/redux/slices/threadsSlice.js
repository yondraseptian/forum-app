import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailThreadById, getThreads } from "../../utils/api";

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
      // console.log(response.detailThread);
      return response.detailThread;
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
      });
  },
});

export default threadsSlice;
