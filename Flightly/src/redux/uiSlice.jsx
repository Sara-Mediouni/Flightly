import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showLoginPopup: false,
  },
  reducers: {
    openLoginPopup: (state) => { state.showLoginPopup = true; },
    closeLoginPopup: (state) => { state.showLoginPopup = false; },
  },
});

export const { openLoginPopup, closeLoginPopup } = uiSlice.actions;
export default uiSlice.reducer;
