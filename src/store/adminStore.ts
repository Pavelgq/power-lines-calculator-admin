import { createSlice } from "@reduxjs/toolkit";
import { start } from "repl";
import { AdminDataInterface } from "../interfaces/admin.interface";
import { RootState } from "./store";

export interface AdminStoreI {
  info: AdminDataInterface | null;
  isLoading: boolean;
  error: Error | null;
  auth: boolean;
}

const initialState: AdminStoreI = {
  info: null,
  isLoading: false,
  error: null,
  auth: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.info = action.payload;
    },
    logoutAdmin: (state, action) => {
      state.info = null;
      state.auth = false;
    },
    profileAdmin: (state, action) => {
      state.isLoading = true;
    },
    profileAdminSuccess: (state, action) => {
      state.info = {
        login: action.payload.login,
        status: action.payload.status,
      };
      state.auth = true;
      state.isLoading = false;
    },
    getAdminFetch: (state, action) => {
      state.isLoading = true;
    },
    getAdminSuccess: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
      state.auth = true;
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
    },
  },
});

export const {
  loginAdmin,
  logoutAdmin,
  profileAdmin,
  profileAdminSuccess,
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
  deleteAdminFailure,
} = adminSlice.actions;

export default adminSlice.reducer;

export const selectCurrentAdmin = (state: RootState) => state.admin.info;
export const selectIsAuthenticated = (state: RootState) => state.admin.auth;
export const selectIsLoadingAdmin = (state: RootState) => state.admin.isLoading;
