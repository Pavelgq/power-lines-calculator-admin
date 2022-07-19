import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useSortableData } from "../../../hooks/useSortableData";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { selectAllClients, selectAllIds } from "../../../store/clientsStore";
import { ClientCardList } from "../ClientCardList/ClientCardList";
import { ClientTable } from "../ClientTable/ClientTable";
import { CreateClientForm } from "../CreateClientForm/CreateClientForm";
import { RequestsTable } from "../RequestsTable/RequestsTable";
import { Search } from "../Search/Search";
import { RequestsListProps } from "./RequestsList.props";

import styles from "./ClientsList.module.css";

export const columns = [
  {
    field: "ordinal",
    headerName: "№",
    width: 40,
    numeric: false,
    sorting: true,
    search: false,
    request: true,
  },
  {
    field: "last_name",
    headerName: "ФИО",
    width: 120,
    numeric: false,
    sorting: true,
    search: true,
    request: true,
  },
  {
    field: "company",
    headerName: "Компания",
    width: 180,
    numeric: false,
    sorting: true,
    search: true,
    request: true,
  },
  {
    field: "office_position",
    headerName: "Должность",
    width: 130,
    numeric: false,
    sorting: false,
    search: false,
    request: true,
  },
  {
    field: "contacts",
    headerName: "Контакты",
    width: 230,

    sorting: false,
    search: false,
    request: true,
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
    request: true,
  },
];

const searchFields = columns.filter((el) => el.search).map((el) => el.field);

export function RequestsList({
  Component,
  selectForIds,
}: RequestsListProps): JSX.Element {
  const navigate = useNavigate();
  const { clientId } = useParams() || "";
  const [windowsX, windowsY] = useWindowSize();
  const [selectClient, setSelectClient] = useState(0);
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchValue, setSearchValue] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const [token] = useLocalStorage("token");

  const data = useSelector(selectAllClients);
  const allIds = useSelector(selectForIds);

  const { items, sortConfig, sortingField } = useSortableData<{
    [id: string]: ClientDataInterface;
  }>(allIds, data, searchValue, searchFields, timeFilter);

  useEffect(() => {
    if (clientId && Object.prototype.hasOwnProperty.call(data, clientId)) {
      setSearchValue(`${data[clientId].last_name}`); // ${data[clientId].first_name}
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteFilterUser = () => {
    const path = `/clients`;
    navigate(path);
    setSearchValue("");
    setPage(0);
  };

  return (
    <Grid container spacing={2} direction="column" paddingLeft={0}>
      <Grid
        container
        item
        wrap="nowrap"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Search
            value={searchValue}
            handleChange={setSearchValue}
            filterUser={clientId && data[clientId].last_name}
            deleteFilterUser={handleDeleteFilterUser}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Component
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          sortConfig={sortConfig}
          sortingField={sortingField}
          page={page}
          handleChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
