import { createSlice } from "@reduxjs/toolkit";

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    getClientsFetch: (state, action) => {
      state.isLoading = true;
    },
    getClientsSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getClientsFailure: (state) => {
      //TODO: Что будем делать с ошибкой
      state.isLoading = false;
    }
  }
})

export const { getClientsFetch, getClientsSuccess, getClientsFailure } = clientsSlice.actions;

export default clientsSlice.reducer;