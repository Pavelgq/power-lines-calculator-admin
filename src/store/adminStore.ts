import { createSlice } from "@reduxjs/toolkit";
import { AdminDataInterface } from "../interfaces/admin.interface";

export interface AdminStoreI {
  info: AdminDataInterface | null;
  isLoading: boolean;
  error: Error | null;
}

const initialState: AdminStoreI = {
    info: null,
    isLoading: false,
    error: null,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.info = action.payload;
    },
    logoutAdmin: (state, action) => {
      state.info = null;
    },
    getAdminFetch: (state, action) => {
      state.isLoading = true;
    },
    getAdminSuccess: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
    },
    getAdminFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createAdminFetch: (state, action) => {
      state.isLoading = true;
    },
    createAdminSuccess: (state, action) => {
      state.isLoading = false;
    },
    createAdminFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    changeAdminFetch: (state, action) => {
      state.isLoading = true;
    },
    changeAdminSuccess: (state, action) => {
      state.isLoading = false;
    },
    changeAdminFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteAdminFetch: (state, action) => {
      state.isLoading = true;
    },
    deleteAdminSuccess: (state, action) => {
      state.isLoading = false;
    },
    deleteAdminFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
})

export const { 
  loginAdmin,
  logoutAdmin,
  getAdminFetch, 
  getAdminSuccess, 
  getAdminFailure, 
  createAdminFetch,
  createAdminSuccess,
  createAdminFailure,
  changeAdminFetch,
  changeAdminSuccess,
  changeAdminFailure,
  deleteAdminFetch, 
  deleteAdminSuccess, 
  deleteAdminFailure 
} = adminSlice.actions;

export default adminSlice.reducer;