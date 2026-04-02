import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { ClientDataInterface } from "../interfaces/client.interface";
import { RootState } from "./store";

interface ClientStateI {
  data: { [id: string]: ClientDataInterface };
  allIds: (keyof { [id: string]: ClientDataInterface })[];
  isLoading: boolean;
  error: Error | null;
  message: string;
}

const initialState: ClientStateI = {
  data: {},
  allIds: [],
  isLoading: false,
  error: null,
  message: "",
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    checkClientAccept: (
      state,
      action: {
        payload: {
          id: string;
          isAccept: boolean;
        };
        type: string;
      }
    ) => {
      state.data[action.payload.id].isAccept = action.payload.isAccept;
    },
    getClientsFetch: (state, _action: PayloadAction<{ token: string }>) => {
      state.isLoading = true;
    },
    getClientsSuccess: (state, action: PayloadAction<ClientDataInterface[]>) => {
      state.allIds = [];
      action.payload.forEach((c: ClientDataInterface) => {
        state.allIds.push(c.id);
      });
      state.data = {};
      action.payload.forEach((c: ClientDataInterface) => {
        Object.assign(state.data, { [c.id]: c });
      });
      state.isLoading = false;
    },
    getClientsFailure: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload as Error;
      state.isLoading = false;
    },
    getOneClientFetch: (
      state,
      _action: PayloadAction<{ token: string; id: number }>
    ) => {
      state.isLoading = true;
    },
    getOneClientSuccess: (
      state,
      _action: PayloadAction<ClientDataInterface>
    ) => {
      state.isLoading = false;
    },
    getOneClientFailure: (state, _action: PayloadAction<unknown>) => {
      state.isLoading = false;
    },
    createClientsFetch: (
      state,
      _action: PayloadAction<{ data: ClientDataInterface; token: string }>
    ) => {
      state.isLoading = true;
    },
    createClientSuccess: (
      state,
      action: PayloadAction<{ data: ClientDataInterface }>
    ) => {
      state.allIds.push(action.payload.data.id);
      state.data[action.payload.data.id] = {
        ...action.payload.data,
        isAccept: false,
      };
      state.isLoading = false;
    },
    createClientFailure: (state, _action: PayloadAction<unknown>) => {
      state.isLoading = false;
    },
    updateClientsFetch: (
      state,
      _action: PayloadAction<{
        token: string;
        clientId: number;
        clientData: ClientDataInterface;
      }>
    ) => {
      state.isLoading = true;
    },
    updateClientSuccess: (
      state,
      action: PayloadAction<ClientDataInterface & { id: number; message?: string }>
    ) => {
      state.isLoading = false;
      state.data[action.payload.id] = action.payload;
      state.message = action.payload.message ?? "";
    },
    updateClientFailure: (state, _action: PayloadAction<unknown>) => {
      state.isLoading = false;
    },
    deleteClientFetch: (
      state,
      _action: PayloadAction<{ token: string; id: number }>
    ) => {
      state.isLoading = true;
    },
    deleteClientSuccess: (
      state,
      action: PayloadAction<{ clientId?: number; id?: number }>
    ) => {
      const clientId = action.payload.clientId ?? action.payload.id;
      if (clientId == null) {
        state.isLoading = false;
        return;
      }
      const i = state.allIds.indexOf(clientId);
      if (i !== -1) {
        state.allIds.splice(i, 1);
      }
      delete state.data[clientId];
      state.isLoading = false;
    },
    deleteClientFailure: (state, _action: PayloadAction<unknown>) => {
      state.isLoading = false;
    },
    acceptRequestFetch: (
      state,
      _action: PayloadAction<{
        token: string;
        clientId: number;
        clientData: ClientDataInterface;
      }>
    ) => {
      state.isLoading = true;
    },
    rejectRequestFetch: (
      state,
      _action: PayloadAction<{ token: string; id: number }>
    ) => {
      state.isLoading = true;
    },
    downloadClientsFetch: (
      _state,
      _action: PayloadAction<{ token: string }>
    ) => {},
    downloadClientsSuccess: (
      state,
      action: PayloadAction<{ message?: string }>
    ) => {
      state.message = action.payload.message ?? "";
    },
    downloadClientsFailure: (_state, _action: PayloadAction<unknown>) => {},
  },
  extraReducers: {
    "accept/createAcceptKeySuccess": (state, action) => {
      const { clientId } = action.payload;
      state.data[clientId].isAccept = true;
      state.data[clientId].update = moment().format();
      state.data[clientId].client_key =
        action.payload?.key || state.data[clientId].client_key;
      state.data[clientId].valid_until = action.payload.validDate;
    },
    "accept/changeAcceptKeySuccess": (state, action) => {
      const { clientId } = action.payload;
      state.data[clientId].isAccept = true;
      state.data[clientId].update = moment().format();
      state.data[clientId].client_key =
        action.payload?.key || state.data[clientId].client_key;
      state.data[clientId].valid_until = action.payload.validDate;
    },
  },
});

export const {
  checkClientAccept,
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
  acceptRequestFetch,
  rejectRequestFetch,
  downloadClientsFetch,
  downloadClientsSuccess,
  downloadClientsFailure,
} = clientsSlice.actions;

export default clientsSlice.reducer;

export const selectAllClients = (state: RootState) => state.clients.data;
export const selectAllIds = (state: RootState) => state.clients.allIds;

export const selectAcceptClients = (state: RootState) =>
  Object.keys(state.clients.data).filter(
    (id) => !state.clients.data[id].request
  );
export const selectRequestClients = (state: RootState) =>
  Object.keys(state.clients.data).filter(
    (id) => state.clients.data[id].request
  );

export const selectIsLoadingClient = (state: RootState) =>
  state.clients.isLoading;
