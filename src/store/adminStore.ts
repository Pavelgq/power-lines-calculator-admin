import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    info: [],
    isLoading: false,
    token: '',
  },
  reducers: {
    getAdminFetch: (state, action) => {
      state.isLoading = true;
    },
    getAdminSuccess: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
    },
    getAdminFailure: (state) => {
      //TODO: Что будем делать с ошибкой
      state.isLoading = false;
    }
  }
})

export const { getAdminFetch, getAdminSuccess, getAdminFailure } = adminSlice.actions;

export default adminSlice.reducer;