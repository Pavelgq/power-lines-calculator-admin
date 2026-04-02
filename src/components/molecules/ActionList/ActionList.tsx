/* eslint-disable react/jsx-props-no-spreading */
import {
  SelectChangeEvent,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  Box,
  Chip,
  TextField,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  programsType,
  actionsRowsPerPageDefault,
  actionsRowsPerPageOptions,
} from "../../../data/actionData";
import { rowsPerPageFromSelectValue } from "../../../helpers/rowsPerPageStorage";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import {
  selectCurrentActions,
  selectTotalActions,
  selectIsLoadingActions,
  getAllActions,
} from "../../../store/actionStore";
import { selectAllClients } from "../../../store/clientsStore";
import { firstUpperChar } from "../../../helpers/format";
import { Loading } from "../../atoms/Loading/Loading";
import { ActionTable } from "../ActionTable/ActionTable";
import { ActionCardList } from "../ActionCardList/ActionCardList";

import styles from "./ActionList.module.css";

export interface ClientActionsProps {
  clientId: string | undefined;
}

export interface SortI {
  field: string;
  dir: "asc" | "desc";
}

const ACTIONS_ROWS_LS_KEY = "admin.actions.rowsPerPage";

function parseActionsRowsPerPage(raw: string): number {
  const n = parseInt(String(raw).trim(), 10);
  if (
    Number.isFinite(n) &&
    (actionsRowsPerPageOptions as readonly number[]).includes(n)
  ) {
    return n;
  }
  return actionsRowsPerPageDefault;
}

function canonicalActionsRowsPerPageStr(raw: string): string {
  return String(parseActionsRowsPerPage(raw));
}

export function ActionList({ clientId }: ClientActionsProps): JSX.Element {
  const [windowsX] = useWindowSize();

  const [token] = useLocalStorage("token");
  const [limitStr, setLimitStr] = useLocalStorage(
    ACTIONS_ROWS_LS_KEY,
    String(actionsRowsPerPageDefault)
  );
  const limit = parseActionsRowsPerPage(limitStr);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const next = canonicalActionsRowsPerPageStr(limitStr);
    if (next !== limitStr) {
      setLimitStr(next);
    }
  }, [limitStr, setLimitStr]);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      setClientIdSelected(clientId);
      setSelectClient("");
    }
  }, [clientId]);

  useEffect(() => {
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
    token,
  ]);

  const searchClients = (value: string) => {
    const q = value.trim().toLowerCase();
    return Object.values(clients).filter((client) => {
      const fn = String(client.first_name ?? "").toLowerCase();
      const ln = String(client.last_name ?? "").toLowerCase();
      return !q || fn.includes(q) || ln.includes(q);
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event: { target: { value: unknown } }) => {
    const n = rowsPerPageFromSelectValue(
      event.target.value,
      actionsRowsPerPageOptions
    );
    if (n === null) {
      return;
    }
    setLimitStr(String(n));
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
    setSelectClient("");
    setPage(0);
    navigate("/actions");
  };

  const showNotAction = () => {
    if (isLoading) {
      return <Loading />;
    }
    return <span className={styles.notFound}>Действий не найдено</span>;
  };

  const listProps = {
    data: clientActions,
    limit,
    page,
    total: totalItems,
    sort: sortParams,
    programType,
    handleSort: setSortParams,
    handleChangePage,
    handleChangeLimit,
  };

  let actionsListBody: JSX.Element;
  if (!clientActions?.length) {
    actionsListBody = showNotAction();
  } else if (windowsX > 1050) {
    actionsListBody = <ActionTable {...listProps} />;
  } else {
    actionsListBody = <ActionCardList {...listProps} />;
  }

  return (
    <Stack spacing={2} sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", md: "auto" },
          }}
        >
          {programsType.map((p) => (
            <Button
              key={p.name}
              type="submit"
              variant="contained"
              size="small"
              onClick={() => setProgramTypeFilter(p.value)}
            >
              {p.name}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            flex: { md: "1 1 260px" },
            minWidth: 0,
            width: { xs: "100%", md: "auto" },
            display: "flex",
            alignItems: "center",
          }}
        >
          {clientIdSelected && clients[clientIdSelected] ? (
            <Autocomplete
              fullWidth
              autoComplete
              autoHighlight
              value={null}
              inputValue={selectClient}
              onInputChange={(event, newInputValue) => {
                setSelectClient(newInputValue);
              }}
              onChange={(event, user) => {
                if (user) {
                  const id = user.id.toString();
                  setClientIdSelected(id);
                  setSelectClient("");
                  setSearchValue("");
                  setPage(0);
                  navigate(`/actions/${id}`);
                }
              }}
              options={searchClients(selectClient)}
              getOptionLabel={(option) =>
                `${option.ordinal} ${option.last_name}`
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.last_name} {option.first_name}
                </Box>
              )}
              renderInput={(params) => {
                const chipLabel = [
                  firstUpperChar(clients[clientIdSelected].last_name ?? ""),
                  firstUpperChar(clients[clientIdSelected].first_name ?? ""),
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <TextField
                    id={params.id}
                    disabled={params.disabled}
                    fullWidth={params.fullWidth}
                    size={params.size}
                    InputLabelProps={params.InputLabelProps}
                    label="Найти другого пользователя"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <Chip
                            label={chipLabel}
                            size="small"
                            tabIndex={-1}
                            onDelete={handleDeleteFilterUser}
                            sx={{ mr: 0.5, maxWidth: { xs: "42%", sm: 200 } }}
                          />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                );
              }}
            />
          ) : (
            <Autocomplete
              fullWidth
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
                  id={params.id}
                  disabled={params.disabled}
                  fullWidth={params.fullWidth}
                  size={params.size}
                  InputLabelProps={params.InputLabelProps}
                  label="Выберите пользователя"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  InputProps={params.InputProps}
                />
              )}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: 200 },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
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
        </Box>
      </Box>

      <Box sx={{ width: "100%", minWidth: 0 }}>{actionsListBody}</Box>
    </Stack>
  );
}
