import { useState } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useSortableData } from "../../../hooks/useSortableData";
import { selectAllClients, selectAllIds } from "../../../store/clientsStore";

const columns = [
  {
    field: "ordinal",
    headerName: "№",
    width: 20,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "last_name",
    headerName: "Фамилия",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "first_name",
    headerName: "Имя",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "company",
    headerName: "Компания",
    width: 130,
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
    field: "phone_number",
    headerName: "Телефон",
    width: 80,

    sorting: false,
    search: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
    sorting: false,
    search: false,
  },
  {
    field: "acceptKey",
    headerName: "Ключ",
    width: 130,
    sorting: false,
    search: false,
  },
  {
    field: "actions",
    headerName: "",
    width: 130,
    sorting: false,
    search: false,
  },
];

const searchFields = columns.filter((el) => el.search).map((el) => el.field);

export const ClientsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchValue, setSearchValue] = useState("");

  const [token] = useLocalStorage("token");

  const data = useSelector(selectAllClients);
  const allIds = useSelector(selectAllIds);

  const { items, sortConfig, sortingField } = useSortableData(
    allIds,
    data,
    searchValue,
    searchFields
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = () => {
    console.log("sort");
  };

  return {};
};
