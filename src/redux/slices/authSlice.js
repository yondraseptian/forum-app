import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { loginUser, registerUser } from '../../utils/api';

export const loginUserAsync = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await loginUser({ email, password });
      dispatch(hideLoading());
      return response;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error.message);
    }
  },
);

export const registerUserAsync = createAsyncThunk(
  'register/registerUser',
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await registerUser(name, email, password);
      dispatch(hideLoading());
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      const newState = { ...state };
      newState.token = null;
      newState.isLoggedIn = false;
      localStorage.removeItem('token');
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => ({ ...state, isLoading: true, error: null }))
      .addCase(loginUserAsync.fulfilled, (state, action) => ({
        ...state, isLoading: false, isLoggedIn: true, token: action.payload,
      }))
      .addCase(loginUserAsync.rejected, (state, action) => ({
        ...state, isLoading: false, error: action.payload,
      }))
      .addCase(registerUserAsync.pending, (state) => ({ ...state, isLoading: true, error: null }))
      .addCase(registerUserAsync.fulfilled, (state) => ({ ...state, isLoading: false }))
      .addCase(registerUserAsync.rejected, (state, action) => ({
        ...state, isLoading: false, error: action.payload,
      }));
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
