import { createSlice } from "@reduxjs/toolkit";
import { start } from "repl";
import {
  AdminDataInterface,
  AdminFullInterface,
} from "../interfaces/admin.interface";
import { RootState } from "./store";

export interface AdminStoreI {
  info: AdminDataInterface | null;
  admins: AdminFullInterface[];
  isLoading: boolean;
  error: Error | null;
  auth: boolean;
  token: string;
  message: string;
}

const initialState: AdminStoreI = {
  info: null,
  admins: [],
  isLoading: false,
  error: null,
  auth: false,
  token: "",
  message: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.error = null;
      state.isLoading = true;
      state.info = action.payload;
    },
    logoutAdmin: (state) => {
      state.info = null;
      state.token = "";
      state.auth = false;
      state.isLoading = false;
    },
    profileAdmin: (state, action) => {
      state.isLoading = true;
    },
    profileAdminSuccess: (state, action) => {
      state.info = {
        id: action.payload.id,
        login: action.payload.login,
        status: action.payload.status,
      };
      state.token = action.payload.token;
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
      state.error = action.payload.message;
      state.isLoading = false;
    },
    getAdminsFetch: (state, action) => {
      // state.isLoading = true;
    },
    getAdminsSuccess: (state, action) => {
      state.admins = action.payload;
      state.isLoading = false;
    },
    getAdminsFailure: (state, action) => {
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
      const adminData = {
        id: action.payload.id,
        login: action.payload.login,
        status: action.payload.status,
      };

      if (action.payload.id === state.info?.id) {
        state.info = adminData;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.auth = true;
      } else {
        const adminIndex = state.admins.findIndex(
          (el) => el.id === action.payload.id
        );
        state.admins[adminIndex] = {
          token: action.payload.token,
          ...adminData,
        };
      }

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
  getAdminsFetch,
  createAdminFetch,
  getAdminsSuccess,
  getAdminsFailure,
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
export const selectAllAdmins = (state: RootState) => state.admin.admins;
export const selectIsAuthenticated = (state: RootState) => state.admin.auth;
export const selectIsError = (state: RootState) => state.admin.error;
export const selectIsLoadingAdmin = (state: RootState) => state.admin.isLoading;
