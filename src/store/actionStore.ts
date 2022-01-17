import { createSlice } from "@reduxjs/toolkit";
import { ActionCreateInterface, ActionFullInterface } from "../interfaces/action.interface";
import { RootState } from "./store";

export interface ActionStoreI {
  data: ActionFullInterface[] | null;
  total_items: number;
  isLoading: boolean;
  error: Error | null;
  message: string;
}

const initialState: ActionStoreI = {
  data: null,
  total_items: 0,
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
    createClientActionSuccess(state, action: {payload: {
      data:  ActionFullInterface;
      message: string;
    }}) {
      state.data?.push(action.payload.data);
      state.message = action.payload.message;
      state.isLoading = false;
    },
    createClientActionFailure(state, action) {
      state.isLoading = false;
    },
    getAllActions(state, action) {
      state.isLoading = true;
    },
    getAllActionsSuccess(state, action) {
      console.log("getAllActionsSuccess", action)
      state.data = action.payload.data;
      state.total_items = action.payload.total_items;
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
export const selectTotalActions = (state: RootState) => state.actions.total_items;
export const selectIsLoadingActions = (state: RootState) =>
  state.actions.isLoading;
