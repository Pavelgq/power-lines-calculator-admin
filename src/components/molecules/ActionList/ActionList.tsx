/* eslint-disable react/jsx-props-no-spreading */
import {
  SelectChangeEvent,
  Grid,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  Box,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { programsType } from "../../../data/actionData";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import {
  selectCurrentActions,
  selectTotalActions,
  selectIsLoadingActions,
  getAllActions,
} from "../../../store/actionStore";
import { selectAllClients } from "../../../store/clientsStore";
import { Loading } from "../../atoms/Loading/Loading";
import { ActionTable } from "../ActionTable/ActionTable";
import { Search } from "../Search/Search";

import styles from "./ActionList.module.css";

export interface ClientActionsProps {
  clientId: string | undefined;
}

export interface SortI {
  field: string;
  dir: "asc" | "desc";
}

export function ActionList({ clientId }: ClientActionsProps): JSX.Element {
  const [windowsX, windowsY] = useWindowSize();

  const [token] = useLocalStorage("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [programType, setProgramType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectClient, setSelectClient] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [clientIdSelected, setClientIdSelected] = useState(clientId || "");
  const [sortParams, setSortParams] = useState<SortI>({
    field: "date",
    dir: "desc",
  });

  const clients = useSelector(selectAllClients);
  const clientActions = useSelector(selectCurrentActions);
  const totalItems = useSelector(selectTotalActions);
  const isLoading = useSelector(selectIsLoadingActions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        getAllActions({
          token,
          page,
          limit,
          filters: {
            client_id: clientIdSelected || "",
            program_type: programType || "0",
            project_name: searchValue,
          },
          sort: sortParams,
          period: timeFilter,
        })
      );
    }
    return () => {};
  }, [
    dispatch,
    page,
    limit,
    clientId,
    programType,
    searchValue,
    timeFilter,
    sortParams,
    clientIdSelected,
  ]);

  const searchClients = (value: string) => {
    const clientList = Object.values(clients).filter(
      (client) =>
        client.first_name.includes(value) || client.last_name.includes(value)
    );
    return clientList;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setProgramTypeFilter = (n: number) => {
    setProgramType(n.toString());
    setPage(0);
  };

  const handleTimeFilter = (event: SelectChangeEvent) => {
    setTimeFilter(event.target.value as string);
  };

  const handleDeleteFilterUser = () => {
    setClientIdSelected("");
    setSearchValue("");
    setPage(0);
  };

  const showNotAction = () => {
    if (isLoading) {
      return <Loading />;
    }
    return <span className={styles.notFound}>Действий не найдено</span>;
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid
        container
        item
        spacing={{ xs: 1, sm: 2 }}
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        // wrap="nowrap"
      >
        {programsType.map((p) => (
          <Grid item key={p.name}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={() => setProgramTypeFilter(p.value)}
            >
              {p.name}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={5} lg={6}>
          {clientIdSelected ? (
            <Search
              value={searchValue}
              handleChange={setSearchValue}
              filterUser={clients[clientIdSelected].last_name}
              deleteFilterUser={handleDeleteFilterUser}
            />
          ) : (
            <Autocomplete
              autoComplete
              autoHighlight
              value={clients[clientIdSelected]}
              onChange={(event, user) => {
                setClientIdSelected((user && user.id.toString()) || "");
              }}
              inputValue={selectClient}
              onInputChange={(event, newInputValue) => {
                setSelectClient(newInputValue);
              }}
              options={searchClients("")}
              getOptionLabel={(option) =>
                `${option.ordinal} ${option.last_name}`
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.last_name} {option.first_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Выберите пользователя"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Select
            fullWidth
            defaultValue="all"
            value={timeFilter}
            onChange={handleTimeFilter}
          >
            <MenuItem value="all">Все время</MenuItem>
            <MenuItem value="day">День</MenuItem>
            <MenuItem value="week">Неделя</MenuItem>
            <MenuItem value="month">Месяц</MenuItem>
            <MenuItem value="quarter">Квартал</MenuItem>
            <MenuItem value="year">Год</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid item>
        {clientActions?.length ? (
          <ActionTable
            data={clientActions}
            limit={limit}
            page={page}
            total={totalItems}
            sort={sortParams}
            programType={programType}
            handleSort={setSortParams}
            handleChangePage={handleChangePage}
            handleChangeLimit={handleChangeLimit}
          />
        ) : (
          showNotAction()
        )}
      </Grid>
    </Grid>
  );
}
