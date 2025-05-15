// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user')||null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', action.payload);
      
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.clear()
    },
  },
});

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;
