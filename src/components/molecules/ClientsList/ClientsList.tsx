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
import { columns } from "../../../data/clientsData";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useSortableData } from "../../../hooks/useSortableData";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { selectAllClients, selectAllIds } from "../../../store/clientsStore";
import { ClientCardList } from "../ClientCardList/ClietnCardList";
import { ClientTable } from "../ClientTable/ClientTable";
import { CreateClientForm } from "../CreateClientForm/CreateClientForm";
import { RequestsTable } from "../RequestsTable/RequestsTable";
import { Search } from "../Search/Search";
import { ClientListProps } from "./ClientList.props";

import styles from "./ClientsList.module.css";



const searchFields = columns.filter((el) => el.search).map((el) => el.field);

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
    <Grid container spacing={2} direction="column">
      <Grid
        container
        wrap="nowrap"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {/* <Grid item xs={2} justifyContent="space-between" alignItems="center">
          <Container className={styles.noPadding}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={handleOpenCreate}
            >
              Добавить пользователя
            </Button>
            <CreateClientForm
              title="Добавить"
              open={openAddClientDialog}
              setOpen={setOpenAddClientDialog}
            />
          </Container>
        </Grid> */}
        <Grid item xs={10}>
          <Search
            value={searchValue}
            handleChange={setSearchValue}
            filterUser={clientId && data[clientId].last_name}
            deleteFilterUser={handleDeleteFilterUser}
          />
        </Grid>
        <Grid item xs={2}>
          <Select
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
        {/* {windowsX > 1000 ? tableView() : <ClientCardList items={items} />} */}
      </Grid>
    </Grid>
  );
}
