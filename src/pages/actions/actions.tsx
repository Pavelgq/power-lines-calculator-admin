import { Container, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/atoms/Loading/Loading";
import { ActionTable } from "../../components/molecules/ActionTable/ActionTable";
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
} from "../../store/actionStore";
import { RootState } from "../../store/store";

export function Actions() {
  const { clientId } = useParams();

  const [token] = useLocalStorage("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const clientActions = useSelector(selectCurrentActions);
  const isLoading = useSelector(selectIsLoadingActions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActions({ token, page, limit }));
    return () => {};
  }, [dispatch, page, limit]);

  const handleGenerateAction = () => {
    const newData: ActionCreateInterface = {
      client_id: Number(clientId),
      name: `Project#${Math.floor(Math.random() * 100)}`,
      type: "save",
      data: JSON.stringify({ data: "random" }),
    };
    dispatch(
      createClientAction({
        newData,
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Container>
        <Grid container spacing={2}>
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
            <ActionTable
              data={clientActions}
              limit={limit}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeLimit={handleChangeLimit}
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
