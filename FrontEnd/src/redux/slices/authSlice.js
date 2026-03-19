import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (password, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, { password });
      if (data.success && data.token) {
        localStorage.setItem("naqsh-admin-token", data.token);
        return data.token;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("naqsh-admin-token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("naqsh-admin-token"),
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("naqsh-admin-token");
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
