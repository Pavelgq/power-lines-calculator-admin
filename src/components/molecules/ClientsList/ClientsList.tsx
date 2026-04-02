import { Box, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clientSearchFields, columns } from "../../../data/clientsData";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useSortableData } from "../../../hooks/useSortableData";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { selectAllClients } from "../../../store/clientsStore";
import { ClientCardList } from "../ClientCardList/ClientCardList";
import { Search } from "../Search/Search";
import { ClientListProps } from "./ClientList.props";

import styles from "./ClientsList.module.css";

export function ClientsList({
  Component,
  selectForIds,
}: ClientListProps): JSX.Element {
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
  }>(allIds, data, searchValue, clientSearchFields, timeFilter);

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

  const handleOpenCreate = () => {
    setSelectClient(0);
    setOpenAddClientDialog(true);
  };

  const handleDeleteFilterUser = () => {
    const path = `/clients`;
    navigate(path);
    setSearchValue("");
    setPage(0);
  };

  const handleTimeFilter = (event: SelectChangeEvent) => {
    setTimeFilter(event.target.value as string);
    setPage(0);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="stretch"
        sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}
      >
        <Box
          sx={{
            flex: { md: "1 1 0%" },
            minWidth: 0,
            width: "100%",
          }}
        >
          <Search
            value={searchValue}
            handleChange={setSearchValue}
            filterUser={clientId && data[clientId].last_name}
            deleteFilterUser={handleDeleteFilterUser}
          />
        </Box>
        <Box
          sx={{
            flex: { md: "0 0 auto" },
            minWidth: 0,
            width: "100%",
            maxWidth: { md: 220 },
          }}
        >
          <Select
            fullWidth
            className={styles.select}
            defaultValue="all"
            value={timeFilter}
            onChange={handleTimeFilter}
          >
            <MenuItem value="all">все ключи</MenuItem>
            <MenuItem value="day">за день</MenuItem>
            <MenuItem value="week">за неделю</MenuItem>
            <MenuItem value="month">за месяц</MenuItem>
            <MenuItem value="quarter">за квартал</MenuItem>
            <MenuItem value="year">за год</MenuItem>
            <MenuItem value="not">нет ключа</MenuItem>
          </Select>
        </Box>
      </Stack>
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
