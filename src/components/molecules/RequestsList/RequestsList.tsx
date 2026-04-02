import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSortableData } from "../../../hooks/useSortableData";
import { clientSearchFields } from "../../../data/clientsData";
import { firstUpperChar } from "../../../helpers/format";
import {
  canonicalListTableRowsStr,
  REQUESTS_ROWS_LS_KEY,
  parseListTableRowsPerPage,
  rowsPerPageFromSelectValue,
  listTableRowsPerPageOptions,
} from "../../../helpers/rowsPerPageStorage";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { selectAllClients, selectAllIds } from "../../../store/clientsStore";
import { RequestsTable } from "../RequestsTable/RequestsTable";
import { Search } from "../Search/Search";
import { RequestsListProps } from "./RequestsList.props";

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

export function RequestsList({
  Component,
  selectForIds,
}: RequestsListProps): JSX.Element {
  const navigate = useNavigate();
  const { clientId } = useParams() || "";
  const [page, setPage] = useState(0);
  const [rowsPerPageStr, setRowsPerPageStr] = useLocalStorage(
    REQUESTS_ROWS_LS_KEY,
    String(listTableRowsPerPageOptions[0])
  );
  const rowsPerPage = parseListTableRowsPerPage(rowsPerPageStr);

  useEffect(() => {
    const next = canonicalListTableRowsStr(rowsPerPageStr);
    if (next !== rowsPerPageStr) {
      setRowsPerPageStr(next);
    }
  }, [rowsPerPageStr, setRowsPerPageStr]);

  const [searchValue, setSearchValue] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const data = useSelector(selectAllClients);
  const allIds = useSelector(selectForIds);

  const { items, sortConfig, sortingField } = useSortableData<{
    [id: string]: ClientDataInterface;
  }>(allIds, data, searchValue, clientSearchFields, timeFilter);

  useEffect(() => {
    if (clientId && Object.prototype.hasOwnProperty.call(data, clientId)) {
      const row = data[clientId];
      setSearchValue(
        [row.last_name, row.first_name]
          .map((s) => String(s ?? "").trim())
          .filter(Boolean)
          .join(" ")
      );
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: unknown };
  }) => {
    const n = rowsPerPageFromSelectValue(
      event.target.value,
      listTableRowsPerPageOptions
    );
    if (n === null) {
      return;
    }
    setRowsPerPageStr(String(n));
    setPage(0);
  };

  const handleDeleteFilterUser = () => {
    const path = `/clients`;
    navigate(path);
    setSearchValue("");
    setPage(0);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <Box sx={{ width: "100%", minWidth: 0 }}>
        <Search
          value={searchValue}
          handleChange={setSearchValue}
          filterUser={
            clientId && data[clientId]
              ? [
                  firstUpperChar(data[clientId].last_name ?? ""),
                  firstUpperChar(data[clientId].first_name ?? ""),
                ]
                  .filter(Boolean)
                  .join(" ")
              : undefined
          }
          deleteFilterUser={handleDeleteFilterUser}
          placeholderWhenFiltered="Уточнить по ФИО или компании"
        />
      </Box>
      <Box sx={{ width: "100%", minWidth: 0 }}>
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
      </Box>
    </Stack>
  );
}
