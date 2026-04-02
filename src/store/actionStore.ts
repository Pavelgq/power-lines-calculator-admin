import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionFullInterface } from "../interfaces/action.interface";
import { RootState } from "./store";

export type GetAllActionsPayload = {
  token: string;
  page?: number;
  limit?: number;
  filters: Record<string, string>;
  sort: { field: string; dir: string };
  period: string;
};

export interface ActionStoreI {
  data: ActionFullInterface[] | null;
  total_items: number;
  isLoading: boolean;
  error: Error | null;
  message: string;
  filterAttributes?: object;
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
    createClientAction(state) {
      state.isLoading = true;
    },
    createClientActionSuccess(
      state,
      action: PayloadAction<{
        data: ActionFullInterface;
        message: string;
      }>
    ) {
      state.data?.push(action.payload.data);
      state.total_items = Number(state.total_items) + 1;
      state.message = action.payload.message;
      state.isLoading = false;
    },
    createClientActionFailure(state, _action: PayloadAction<unknown>) {
      state.isLoading = false;
    },
    getAllActions(state, _action: PayloadAction<GetAllActionsPayload>) {
      state.isLoading = true;
    },
    getAllActionsSuccess(
      state,
      action: PayloadAction<{
        data: ActionFullInterface[];
        total_items: number;
      }>
    ) {
      state.data = action.payload.data;
      state.total_items = action.payload.total_items;
      state.isLoading = false;
    },
    getAllActionsFailure(state, _action: PayloadAction<unknown>) {
      state.isLoading = false;
    },
    getClientActions(
      state,
      _action: PayloadAction<{ token: string; clientId: number }>
    ) {
      state.isLoading = true;
    },
    getClientActionsSuccess(
      state,
      _action: PayloadAction<ActionFullInterface[]>
    ) {
      state.isLoading = false;
    },
    getClientActionsFailure(state, _action: PayloadAction<unknown>) {
      state.isLoading = false;
    },
    getActionFile(
      state,
      _action: PayloadAction<{ path: string }>
    ) {
      state.isLoading = true;
    },
    getActionFileSuccess(state) {
      state.isLoading = false;
    },
    getActionFileFailure(state, _action: PayloadAction<unknown>) {
      state.isLoading = false;
    },
    downloadActionsFetch: (
      _state,
      _action: PayloadAction<{ token: string; programType: number }>
    ) => {},
    downloadActionsSuccess: (
      state,
      action: PayloadAction<{ message?: string }>
    ) => {
      state.message = action.payload.message ?? "";
    },
    downloadActionsFailure: (
      _state,
      _action: PayloadAction<unknown>
    ) => {},
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
  downloadActionsFetch,
  downloadActionsSuccess,
  downloadActionsFailure,
} = actionSlice.actions;

export default actionSlice.reducer;

export const selectCurrentActions = (state: RootState) => state.actions.data;
export const selectTotalActions = (state: RootState) =>
  state.actions.total_items;
export const selectIsLoadingActions = (state: RootState) =>
  state.actions.isLoading;
