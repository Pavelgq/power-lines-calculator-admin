import {
  SelectChangeEvent,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import {
  selectCurrentActions,
  selectTotalActions,
  selectIsLoadingActions,
  getAllActions,
} from "../../../store/actionStore";
import { ActionTable } from "../ActionTable/ActionTable";
import { Search } from "../Search/Search";

import styles from "./ActionList.module.css";

const columns = [
  {
    field: "id",
    headerName: "№",
    width: 70,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "name",
    headerName: "ФИО",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "category",
    headerName: "Категория",
    width: 70,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "program_type",
    headerName: "Программа",
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
    width: 70,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "date",
    headerName: "Дата",
    width: 130,
    numeric: false,
    sorting: true,
    search: true,
  },

  {
    field: "acceptKey",
    headerName: "Ключ",
    width: 130,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "filePath",
    headerName: "Данные",
    width: 90,
    numeric: false,
    sorting: false,
    search: false,
  },
];

const programs = [
  {
    name: "Все",
    value: 0,
  },
  {
    name: "Экран",
    value: 1,
  },
  {
    name: "Труба",
    value: 2,
  },
  {
    name: "Кабель",
    value: 3,
  },
];

export interface ClientActionsProps {
  clientId: string | undefined;
}

export function ActionList({ clientId }: ClientActionsProps): JSX.Element {
  const [windowsX, windowsY] = useWindowSize();

  const [token] = useLocalStorage("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [programType, setProgramType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

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
            client_id: clientId || "",
            program_type: programType || 0,
            project_name: searchValue,
          },
          sort: {
            field: "date",
            dir: "DESC",
          },
          period: timeFilter,
        })
      );
    }
    return () => {};
  }, [dispatch, page, limit, clientId, programType, searchValue, timeFilter]);

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

  return (
    <Grid container spacing={2} direction="column">
      <Grid
        container
        spacing={1}
        marginTop={1}
        justifyContent="space-between"
        alignItems="center"
      >
        {programs.map((p) => (
          <Grid item key={p.name}>
            <Button
              type="submit"
              variant="contained"
              onClick={() => setProgramTypeFilter(p.value)}
            >
              {p.name}
            </Button>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Search value={searchValue} handleChange={setSearchValue} />
        </Grid>
        <Grid item xs={2}>
          <Select
            className={styles.select}
            defaultValue="all"
            value={timeFilter}
            onChange={handleTimeFilter}
          >
            <MenuItem value="all">Все время</MenuItem>
            <MenuItem value="day">День</MenuItem>
            <MenuItem value="week">Неделя</MenuItem>
            <MenuItem value="month">Месяц</MenuItem>
            <MenuItem value="year">Год</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid item marginTop={2}>
        <ActionTable
          data={clientActions}
          limit={limit}
          page={page}
          total={totalItems}
          handleChangePage={handleChangePage}
          handleChangeLimit={handleChangeLimit}
        />
      </Grid>
    </Grid>
  );
}
