import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

import {
  createClientsFetch,
  getClientsFetch,
  selectAllClients,
  selectIsLoadingClient,
} from "../../store/clientsStore";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ClientCard } from "../../components";
import { ClientForm } from "../../components/molecules/ClientForm/ClientForm";

export function Clients(): JSX.Element {
  const { clientId } = useParams();

  const [token] = useLocalStorage("token");

  const clients = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);
  const dispatch = useDispatch();
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenAddClientDialog(true);
  };

  useEffect(() => {
    dispatch(getClientsFetch({ token }));
    return () => {};
  }, [dispatch]);

  if (isLoading) {
    return <span>Загрузка данных...</span>;
  }

  if (!Object.keys(clients).length) {
    return <div>Клиентов пока нету</div>;
  }

  if (clientId) {
    return <Outlet />;
  }

  return (
    <>
      <Button type="submit" variant="contained" onClick={handleClickOpen}>
        Добавить клиента
      </Button>
      <ClientForm
        title="Добавить"
        open={openAddClientDialog}
        setOpen={setOpenAddClientDialog}
      />
      <Grid container spacing={2}>
        {Object.keys(clients).map((client) => (
          <Grid item key={clients[client].id}>
            <ClientCard client={clients[client]} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
