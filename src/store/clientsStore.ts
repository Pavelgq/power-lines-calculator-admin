import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientDataInterface } from "../interfaces/client.interface";
import { RootState } from "./store";

interface ClientStateI {
  data: { [id: string]: ClientDataInterface };
  allIds: number[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: ClientStateI = {
  data: {},
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
      state.allIds = action.payload.map((c: ClientDataInterface) => c.id);
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
      console.log('createClientSuccess', action)
      state.allIds.push(action.payload.data.id);
      state.data[action.payload.data.id] = action.payload.data;
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
    deleteClientFetch: (state, action) => {
      state.isLoading = true;
    },
    deleteClientSuccess: (state, action) => {
      const i = state.allIds.indexOf(action.payload.clientId);
      if (i !== -1) {
        state.allIds.splice(i, 1);
      }
      delete state.data[action.payload.clientId];
      state.isLoading = false;
    },
    deleteClientFailure: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    'accept/createAcceptKeySuccess': (state, action) => {
      const {clientId} = action.payload;
      console.log(clientId)
      state.data[clientId].client_key = action.payload.key;
      state.data[clientId].valid_until = action.payload.validDate;
      console.log('createAcceptKeySuccess in client', action)
    },
  }
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
  deleteClientFetch,
  deleteClientSuccess,
  deleteClientFailure,
} = clientsSlice.actions;

export default clientsSlice.reducer;

export const selectAllClients = (state: RootState) => state.clients.data;
export const selectIsLoadingClient = (state: RootState) =>
  state.admin.isLoading;
