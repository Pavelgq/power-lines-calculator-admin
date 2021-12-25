import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientDataInterface } from "../interfaces/client.interface";

interface ClientStateI {
  data: ClientDataInterface[];
  byId: Map<number, object>;
  allIds: number[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: ClientStateI = {
  data: [],
  byId: new Map(),
  allIds: [],
  isLoading: false,
  error: null,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClientsFetch: (state, action) => {
      state.isLoading = true;
    },
    getClientsSuccess: (state, action) => {
      state.data = action.payload;
      state.allIds = action.payload.map((c: ClientDataInterface) => c.id);
      action.payload.forEach((c: ClientDataInterface) =>
        state.byId.set(c.id, c)
      );
      state.isLoading = false;
    },
    getClientsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getOneClientFetch: (state, action) => {
      state.isLoading = true;
    },
    getOneClientSuccess: (state, action) => {
      state.isLoading = false;
    },
    getOneClientFailure: (state, action) => {
      state.isLoading = false;
    },
    createClientsFetch: (state, action) => {
      state.isLoading = true;
    },
    createClientSuccess: (state, action) => {
      // state.data.push(action.payload);
      state.isLoading = false;
    },
    createClientFailure: (state, action) => {
      state.isLoading = false;
    },
    updateClientSuccess: (state, action) => {
      state.isLoading = false;
    },
    updateClientFailure: (state, action) => {
      state.isLoading = false;
    },
    deleteClientSuccess: (state, action) => {
      state.isLoading = false;
    },
    deleteClientFailure: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  getClientsFetch,
  getClientsSuccess,
  getClientsFailure,
  getOneClientFetch,
  getOneClientSuccess,
  getOneClientFailure,
  createClientsFetch,
  createClientSuccess,
  createClientFailure,
  updateClientSuccess,
  updateClientFailure,
  deleteClientSuccess,
  deleteClientFailure,
} = clientsSlice.actions;

export default clientsSlice.reducer;
