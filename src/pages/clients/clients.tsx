import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  createClientsFetch,
  deleteClientFetch,
  getClientsFetch,
  selectAllClients,
  selectIsLoadingClient,
} from "../../store/clientsStore";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ClientCard } from "../../components";
import { CreateClientForm } from "../../components/molecules/CreateClientForm/CreateClientForm";
import { ClientTable } from "../../components/molecules/ClientTable/ClientTable";
import { AlertDialog } from "../../components/molecules/AlertDialog/AlertDialog";
import { EditClientForm } from "../../components/molecules/EditClientForm/EditClientForm";

export function Clients(): JSX.Element {
  const { clientId } = useParams();

  const [token] = useLocalStorage("token");
  const [viewToggle, setViewToggle] = useState("table");
  const [selectClient, setSelectClient] = useState(0);
  const clients = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);
  const dispatch = useDispatch();
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenCreate = () => {
    setSelectClient(0);
    setOpenAddClientDialog(true);
  };

  const handleToggleAlert = () => {
    if (!selectClient) {
      return;
    }
    setOpenAlert(!openAlert);
  };

  const handleToggleUpdate = () => {
    if (!selectClient) {
      return;
    }
    setOpenUpdate(!openUpdate);
  };

  const handleDeleteSelectClient = () => {
    if (!selectClient) {
      return;
    }
    dispatch(deleteClientFetch({ token, id: selectClient }));
    setOpenAlert(!openAlert);
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
    <main>
      <Container>
        <Grid container spacing={2} direction="column">
          <Typography variant="h4" marginBottom={1}>
            Список клиентов
          </Typography>
          <Grid container wrap="nowrap" spacing={1}>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="small"
                onClick={handleOpenCreate}
              >
                Добавить клиента
              </Button>
              <CreateClientForm
                title="Добавить"
                open={openAddClientDialog}
                setOpen={setOpenAddClientDialog}
              />
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                size="small"
                onClick={() => handleToggleUpdate()}
              >
                Изменить
              </Button>
              <EditClientForm
                open={openUpdate}
                clientId={Number(selectClient)}
                setOpen={setOpenUpdate}
              />
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() => handleToggleAlert()}
              >
                Удалить
              </Button>
              <AlertDialog
                open={openAlert}
                handleClose={handleToggleAlert}
                handleChange={handleDeleteSelectClient}
              />
            </Grid>
          </Grid>
          <Grid item>
            {viewToggle === "table" ? (
              <ClientTable
                data={clients}
                selectClient={selectClient}
                setSelectClient={setSelectClient}
              />
            ) : (
              Object.keys(clients).map((client) => (
                <Grid item key={clients[client].id}>
                  <ClientCard client={clients[client]} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
