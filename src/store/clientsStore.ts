import { saveAs } from "file-saver";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { string } from "yup/lib/locale";
import { ClientDataInterface } from "../interfaces/client.interface";
import { RootState } from "./store";
import { saveToExcel } from "../helpers/format";

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
    getClientsFetch: (state, action) => {
      state.isLoading = true;
    },
    getClientsSuccess: (state, action) => {
      state.allIds = [];
      action.payload.forEach((c: ClientDataInterface, index: number) => {
        state.allIds.push(c.id);
      });
      state.data = {};
      action.payload.forEach((c: ClientDataInterface) => {
        Object.assign(state.data, { [c.id]: c });
        // state.data[c.id].isAccept = true;
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
      state.data[action.payload.data.id] = {
        ...action.payload.data,
        isAccept: false,
      };
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
      state.data[action.payload.id] = action.payload;
      state.message = action.payload.message;
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
    acceptRequestFetch: (state, action) => {
      state.isLoading = true;
    },
    rejectRequestFetch: (state, action) => {
      state.isLoading = true;
    },
    downloadClientsFetch: (state, action) => {
      // state.isLoading = true;
    },
    downloadClientsSuccess: (state, action) => {
      // state.isLoading = false;
      
      // const at = JSON.stringify(action.payload.data)
      // console.log(at)
      // const blob = new Blob([at], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      // });
      // saveAs(blob, `data.xlsx`);
      saveToExcel(action.payload.data)
    },
    downloadClientsFailure: (state, action) => {
      // state.isLoading = false;
    }
  },
  extraReducers: {
    "accept/createAcceptKeySuccess": (state, action) => {
      const { clientId } = action.payload;
      state.data[clientId].isAccept = true;
      state.data[clientId].update = moment().format();
      state.data[clientId].client_key = action.payload?.key || state.data[clientId].client_key;
      state.data[clientId].valid_until = action.payload.validDate;
    },
    "accept/changeAcceptKeySuccess": (state, action) => {
      const { clientId } = action.payload;
      state.data[clientId].isAccept = true;
      state.data[clientId].update = moment().format();
      state.data[clientId].client_key = action.payload?.key || state.data[clientId].client_key;
      state.data[clientId].valid_until = action.payload.validDate;
    }
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
  downloadClientsFailure
} = clientsSlice.actions;

export default clientsSlice.reducer;

export const selectAllClients = (state: RootState) => state.clients.data;
export const selectAllIds = (state: RootState) => state.clients.allIds;

export const selectAcceptClients = (state: RootState) => Object.keys(state.clients.data).filter(id => !state.clients.data[id].request);
export const selectRequestClients = (state: RootState) => Object.keys(state.clients.data).filter(id => state.clients.data[id].request);

export const selectIsLoadingClient = (state: RootState) =>
  state.clients.isLoading;
