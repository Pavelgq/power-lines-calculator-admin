import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientDataInterface } from "../interfaces/client.interface";
import { RootState } from "./store";

interface ClientStateI {
  data: { [id: string]: ClientDataInterface };
  allIds: number[];
  tableIds: number[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: ClientStateI = {
  data: {},
  allIds: [],
  tableIds: [],
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
      action.payload.forEach((c: ClientDataInterface, index: number) => {
        state.allIds.push(c.id);
        state.tableIds.push(index + 1);
      });
      state.data = {};
      action.payload.forEach((c: ClientDataInterface) => {
        Object.assign(state.data, { [c.id]: c });
      });
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
      state.allIds.push(action.payload.data.id);
      state.tableIds.push(state.tableIds.length);
      state.data[action.payload.data.id] = action.payload.data;
      state.isLoading = false;
    },
    createClientFailure: (state, action) => {
      state.isLoading = false;
    },
    updateClientsFetch: (state, action) => {
      state.isLoading = true;
    },
    updateClientSuccess: (state, action) => {
      state.isLoading = false;
    },
    updateClientFailure: (state, action) => {
      state.isLoading = false;
    },
    deleteClientFetch: (state, action) => {
      state.isLoading = true;
    },
    deleteClientSuccess: (state, action) => {
      const i = state.allIds.indexOf(action.payload.clientId);
      if (i !== -1) {
        state.allIds.splice(i, 1);
      }
      state.tableIds = state.allIds.map((el, index) => index);
      delete state.data[action.payload.clientId];
      state.isLoading = false;
    },
    deleteClientFailure: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    "accept/createAcceptKeySuccess": (state, action) => {
      const { clientId } = action.payload;
      console.log(clientId);
      state.data[clientId].client_key = action.payload.key;
      state.data[clientId].valid_until = action.payload.validDate;
      console.log("createAcceptKeySuccess in client", action);
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
  updateClientsFetch,
  updateClientSuccess,
  updateClientFailure,
  deleteClientFetch,
  deleteClientSuccess,
  deleteClientFailure,
} = clientsSlice.actions;

export default clientsSlice.reducer;

export const selectAllClients = (state: RootState) => state.clients.data;
export const selectTableIds = (state: RootState) => state.clients.tableIds;
export const selectAllIds = (state: RootState) => state.clients.allIds;

export const selectIsLoadingClient = (state: RootState) =>
  state.admin.isLoading;
