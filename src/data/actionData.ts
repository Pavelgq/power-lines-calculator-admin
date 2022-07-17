import { ActionColumnParamsI } from "../interfaces/action.interface";

export const programsType = [
  {
    name: "Все",
    value: 0,
  },
  {
    name: "Труба",
    value: 1,
  },
  {
    name: "Экран",
    value: 2,
  },
  {
    name: "Кабель",
    value: 3,
  },
];

export const headerColumns: ActionColumnParamsI[] = [
  {
    field: "id",
    headerName: "№",
    width: 20,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "name",
    headerName: "ФИО",
    width: 90,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "date",
    headerName: "Время захода",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "session",
    headerName: "Длительность",
    width: 70,
    numeric: false,
    sorting: false,
    search: true,
  },
  {
    field: "program_name",
    headerName: "Программа",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "params",
    headerName: "Параметры",
    width: 120,
    numeric: false,
    sorting: false,
    search: false,
  },
];

export const columns: ActionColumnParamsI[] = [
  {
    field: "id",
    headerName: "№",
    width: 20,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "name",
    headerName: "ФИО",
    width: 90,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "date",
    headerName: "Время",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "program_type",
    headerName: "Событие",
    width: 70,
    numeric: false,
    sorting: false,
    search: true,
  },
  {
    field: "project_name",
    headerName: "Название",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "params",
    headerName: "Параметры",
    width: 120,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "filePath",
    headerName: "Данные",
    width: 20,
    numeric: false,
    sorting: false,
    search: false,
  },
];