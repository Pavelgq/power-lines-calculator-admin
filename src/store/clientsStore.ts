import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientDataInterface } from "../interfaces/client.interface";

interface ClientStateI {
  data: ClientDataInterface[];
  isLoading: boolean;
  error: Error | null;
} 

const initialState: ClientStateI = {
    data: [],
    isLoading: false,
    error: null
  }

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    getClientsFetch: (state, action) => {
      state.isLoading = true;
    },
    getClientsSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getClientsFailure: (state, action) => {
      state.error = action.payload;
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
  }
})

export const { getClientsFetch, getClientsSuccess, getClientsFailure, createClientsFetch, createClientSuccess, createClientFailure } = clientsSlice.actions;

export default clientsSlice.reducer;