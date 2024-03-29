import { createSlice } from "@reduxjs/toolkit";
import { AcceptKeyInterface } from "../interfaces/accept.interface";
import { RootState } from "./store";

export interface AcceptStoreI {
  key: AcceptKeyInterface | null;
  isLoading: boolean;
  error: Error | null;
  message: string;
}

const initialState: AcceptStoreI = {
  key: null,
  isLoading: false,
  error: null,
  message: "",
};

export const acceptSlice = createSlice({
  name: "accept",
  initialState,
  reducers: {
    checkAcceptKey(state, action) {},
    checkAcceptKeySuccess(state) {},
    checkAcceptKeyFailure(state, action) {},
    createAcceptKey(state, action) {
      state.isLoading = true;
    },
    createAcceptKeySuccess(state, action) {
      state.isLoading = false;
    },
    createAcceptKeyFailure(state, action) {},
    getAcceptKey(state, action) {},
    getAcceptKeySuccess(state, action) {},
    getAcceptKeyFailure(state, action) {},
    changeAcceptKey(state, action) {
      state.isLoading = true;
    },
    changeAcceptKeySuccess(state, action) {
      state.isLoading = false;
    },
    changeAcceptKeyFailure(state, action) {},
    deleteAcceptKey(state, action) {},
    deleteAcceptKeySuccess(state) {},
    deleteAcceptKeyFailure(state, action) {},
    sendAcceptKey(state, action) {
      state.message = '';
      state.error = null;
    },
    sendAcceptKeySuccess(state, action) {
      state.message = action.payload.message;
    },
    sendAcceptKeyFailure(state, action) {
      state.error = action.payload;
      state.message = 'Произошла ошибка при отправке ключа'
    },
  },
});

export const {
  checkAcceptKey,
  checkAcceptKeySuccess,
  checkAcceptKeyFailure,
  createAcceptKey,
  createAcceptKeySuccess,
  createAcceptKeyFailure,
  getAcceptKey,
  getAcceptKeySuccess,
  getAcceptKeyFailure,
  changeAcceptKey,
  changeAcceptKeySuccess,
  changeAcceptKeyFailure,
  deleteAcceptKey,
  deleteAcceptKeySuccess,
  deleteAcceptKeyFailure,
  sendAcceptKey,
  sendAcceptKeySuccess,
  sendAcceptKeyFailure,
} = acceptSlice.actions;

export default acceptSlice.reducer;

export const selectAcceptKey = (state: RootState) => state.accept.key;
export const selectIsLoadingAccept = (state: RootState) =>
  state.accept.isLoading;
export const selectAcceptMessage = (state: RootState) => state.accept.message;
export const selectAcceptError = (state: RootState) => state.accept.error;
