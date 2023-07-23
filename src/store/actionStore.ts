import { saveAs } from "file-saver";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { ActionFullInterface, Categories, ProgramType, ProgramTypeName } from "../interfaces/action.interface";
import { RootState } from "./store";
import { saveToExcel, saveToExcelBySheet } from "../helpers/format";
import { ProgramParams } from "../components/molecules/ActionParam/ActionParam";

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
      const {programType} = action.payload;
      const newData = action.payload.data
      .map((el:ActionFullInterface & {first_name: string, last_name: string, company: string}, index: number) => {
        const paramsJson = el.params && JSON.parse(el.params);
        const param1 = paramsJson?.param1 || '';
        const param2 = paramsJson?.param2 || '';
        const param3 = paramsJson?.param3 || '';
        const param4 = paramsJson?.param4 || '';
        const programNumber = Number(el.program_type) - 1;
        const paramsTemplate1 = el.params && `${ProgramParams[programNumber].param1}: ${param1}${ProgramParams[programNumber].param1Dim}`;
        const paramsTemplate2 = el.params && `${ProgramParams[programNumber].param2}: ${param2}${ProgramParams[programNumber].param2Dim}`;
        const paramsTemplate3 = el.params && param3 && `${ProgramParams[programNumber].param3}: ${param3}`;
        const paramsTemplate4 = el.params && param4 && `${ProgramParams[programNumber].param4}: ${param4}`;
        return {
          id: index + 1,
          'Имя': el.first_name,
          'Фамилия': el.last_name,
          'Компания': el.company,
          'Дата': moment(el.date).format('DD MMMM YYYY'),
          'Время': moment(el.date).format('HH:mm'),
          'Использованный код': el.accept_key,
          'Программа': ProgramType[el.program_type],
          'Параметр1': paramsTemplate1,
          'Параметр2': paramsTemplate2,
          ...(paramsTemplate3 ? {'Параметр3': paramsTemplate3} : {}),
          ...(paramsTemplate4 ? {'Параметр4': paramsTemplate4} : {})
        }
      })
      saveToExcel( newData, ProgramType[programType], ProgramTypeName[programType])
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
