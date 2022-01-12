import { createSlice } from "@reduxjs/toolkit";
import { ActionFullInterface } from "../interfaces/action.interface";
import { RootState } from "./store";

export interface ActionStoreI {
  data: ActionFullInterface[] | null;
  isLoading: boolean;
  error: Error | null;
  message: string;
}

const initialState: ActionStoreI = {
  data: null,
  isLoading: false,
  error: null,
  message: "",
};

export const actionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    createClientAction(state, action) {
      state.isLoading = true;
    },
    createClientActionSuccess(state) {
      state.isLoading = false;
    },
    createClientActionFailure(state, action) {
      state.isLoading = false;
    },
    getAllActions(state, action) {
      state.isLoading = true;
    },
    getAllActionsSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    getAllActionsFailure(state, action) {
      state.isLoading = false;
    },
    getClientActions(state) {
      state.isLoading = true;
    },
    getClientActionsSuccess(state, action) {
      state.isLoading = false;
    },
    getClientActionsFailure(state, action) {
      state.isLoading = false;
    },
    getActionFile(state, action) {
      state.isLoading = true;
    },
    getActionFileSuccess(state) {
      state.isLoading = false;
    },
    getActionFileFailure(state, action) {
      state.isLoading = false;
    },
  },
});

export const {
  createClientAction,
  createClientActionSuccess,
  createClientActionFailure,
  getAllActions,
  getAllActionsSuccess,
  getAllActionsFailure,
  getClientActions,
  getClientActionsSuccess,
  getClientActionsFailure,
  getActionFile,
  getActionFileSuccess,
  getActionFileFailure,
} = actionSlice.actions;

export default actionSlice.reducer;

export const selectCurrentActions = (state: RootState) => state.actions.data;
export const selectIsLoadingActions = (state: RootState) => state.actions.isLoading;
