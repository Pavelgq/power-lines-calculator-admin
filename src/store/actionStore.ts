import { saveAs } from "file-saver";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { ActionFullInterface, Categories, ProgramType } from "../interfaces/action.interface";
import { RootState } from "./store";
import { saveToExcel } from "../helpers/format";

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
    createClientAction(state, action) {
      state.isLoading = true;
    },
    createClientActionSuccess(
      state,
      action: {
        payload: {
          data: ActionFullInterface;
          message: string;
        };
      }
    ) {
      state.data?.push(action.payload.data);
      state.total_items = Number(state.total_items) + 1;
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
      console.log("getAllActionsSuccess", action);
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
      // state.isLoading = true;
    },
    getActionFileSuccess(state, action) {
      state.isLoading = false;
      const blob = new Blob([JSON.stringify(action.payload.data)], {
        type: "text/plain;charset=utf-8",
      });
      const path = action.payload.path.split(".");
      saveAs(blob, `${path[0]}.txt`);
    },
    getActionFileFailure(state, action) {
      state.isLoading = false;
    },
    downloadActionsFetch: (state, action) => {
    },
    downloadActionsSuccess: (state, action) => {
      const newData = action.payload.data
      .map((el:ActionFullInterface & {first_name: string, last_name: string}, index: number) => ({
          id: index + 1,
          'Имя': el.first_name,
          'Фамилия': el.last_name,
          'Тип': Categories[el.type],
          'Использованный код': el.accept_key,
          'Программа': ProgramType[el.program_type],
          'Параметры': el.params ? JSON.parse(el.params) : {},
          'Путь к файлу': el.path_to_data,
          'Дата': moment(el.date).format('DD MMMM YYYY'),
          'Время': moment(el.date).format('HH:mm')
        }))
      saveToExcel(newData)
    },
    downloadActionsFailure: (state, action) => {
    }
  }
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
  downloadActionsFailure
} = actionSlice.actions;

export default actionSlice.reducer;

export const selectCurrentActions = (state: RootState) => state.actions.data;
export const selectTotalActions = (state: RootState) =>
  state.actions.total_items;
export const selectIsLoadingActions = (state: RootState) =>
  state.actions.isLoading;
