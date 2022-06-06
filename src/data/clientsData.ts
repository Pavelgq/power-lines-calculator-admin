import { ClientColumnI } from "../interfaces/client.interface";



export const clientFields = ['ordinal', 'last_name', 'company', 'office_position', 'contacts', 'acceptKey', 'actions'];
export const requestFields = ['ordinal',  'last_name', 'company', 'office_position', 'contacts', 'date', 'actions'];
export const columns: ClientColumnI[] = [
  {
    field: "ordinal",
    headerName: "№",
    width: 40,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "date",
    headerName: "Время",
    width: 80,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "last_name",
    headerName: "ФИО",
    width: 120,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "company",
    headerName: "Компания",
    width: 180,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "office_position",
    headerName: "Должность",
    width: 130,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "contacts",
    headerName: "Контакты",
    width: 230,

    sorting: false,
    search: false,
  },
  {
    field: "acceptKey",
    headerName: "Ключ",
    width: 90,
    sorting: false,
    search: false,
  },
  {
    field: "actions",
    headerName: "",
    width: 20,
    sorting: false,
    search: false,
  },
];