import {
  Container,
  Grid,
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "../../components/atoms/Loading/Loading";
import { ActionTable } from "../../components/molecules/ActionTable/ActionTable";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  getAllActions,
  selectCurrentActions,
  selectIsLoadingActions,
  selectTotalActions,
} from "../../store/actionStore";

export function AllActions() {
  const [token] = useLocalStorage("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [programType, setProgramType] = useState("");

  const clientActions = useSelector(selectCurrentActions);
  const totalItems = useSelector(selectTotalActions);
  const isLoading = useSelector(selectIsLoadingActions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActions({ token, page, limit, programType }));
    return () => {};
  }, [dispatch, page, limit, programType]);

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
              <Link to="/actions">Все клиенты</Link>
            </Breadcrumbs>
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
