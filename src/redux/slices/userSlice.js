import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers, getProfile } from '../../utils/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await getUsers();
    return response.users;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchProfile = createAsyncThunk(
  'users/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const userProfile = await getProfile(token);
      return userProfile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  users: [],
  profile: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        users: action.payload,
      }))
      .addCase(fetchUsers.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(fetchProfile.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchProfile.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        profile: action.payload,
      }))
      .addCase(fetchProfile.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default userSlice.reducer;
