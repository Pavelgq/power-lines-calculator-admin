import {
  Container,
  Grid,
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
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

import styles from "./AllActions.module.css";

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
    name: "Кабель",
    value: 2,
  },
  {
    name: "Труба",
    value: 3,
  },
];

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

  const setProgramTypeFilter = (n: number) => {
    setProgramType(n.toString());
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
              <Link to="/clients">Пользователи</Link>
              <Link to="/clients/1">Все пользователи</Link>
            </Breadcrumbs>
          </Grid>
          <Grid container spacing={1} marginTop={1}>
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
      </Container>
    </main>
  );
}
