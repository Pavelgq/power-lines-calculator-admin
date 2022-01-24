import {
  Container,
  Grid,
  Button,
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../components/atoms/Loading/Loading";
import { ActionTable } from "../../components/molecules/ActionTable/ActionTable";
import { getRandomFrom } from "../../helpers/random";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  ActionCreateInterface,
  Categories,
} from "../../interfaces/action.interface";
import {
  createClientAction,
  getAllActions,
  selectCurrentActions,
  selectIsLoadingActions,
  selectTotalActions,
} from "../../store/actionStore";
import { RootState } from "../../store/store";

export function ClientActions() {
  const { clientId } = useParams();

  const [token] = useLocalStorage("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [programType, setProgramType] = useState("0");
  const clientActions = useSelector(selectCurrentActions);
  const totalItems = useSelector(selectTotalActions);
  const isLoading = useSelector(selectIsLoadingActions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActions({ token, page, limit, clientId, programType }));
    return () => {};
  }, [dispatch, page, limit, clientId, programType]);

  const handleGenerateAction = () => {
    const newData: ActionCreateInterface = {
      client_id: Number(clientId),
      project_name: `Project#${Math.floor(Math.random() * 100)}`,
      type: getRandomFrom(["save", "load", "calculation"]) as
        | "calculation"
        | "save"
        | "load",
      program_type: Math.floor(Math.random() * 3) + 1,
      params: {
        param1: Math.floor(Math.random() * 8) + 1,
        param2: Math.floor(Math.random() * 100) + 1,
      },
    };
    console.log(newData);
    dispatch(
      createClientAction({
        data: newData,
        acceptToken:
          "eyJhbGciOiJIUzI1NiJ9.MTIzNDU.wHm_iBy9HobGOotzfG56HPVgPvmUr-aA4Ql5NvU2R4w",
      })
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setProgramTypeFilter = (event: SelectChangeEvent) => {
    setProgramType(event.target.value as string);
    setPage(0);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Container>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link to="/clients">Клиенты</Link>
              <Link to="/clients/1">Клиент {clientId}</Link>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              onClick={handleGenerateAction}
            >
              Имитировать действие этого клиента
            </Button>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="program-type-filter">
                Выберите программу
              </InputLabel>
              <Select
                labelId="program-type-filter"
                id="select-program-type"
                value={programType}
                label="Выберите программу"
                onChange={setProgramTypeFilter}
              >
                <MenuItem value={0}>Все</MenuItem>
                <MenuItem value={1}>Экран</MenuItem>
                <MenuItem value={2}>Труба</MenuItem>
                <MenuItem value={3}>Кабель</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
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
      </Container>
    </main>
  );
}
