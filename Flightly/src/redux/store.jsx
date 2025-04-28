// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import countryReducer from './countrySlice';
import uiReducer from './uiSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    country: countryReducer,
    ui: uiReducer,
  },
});
