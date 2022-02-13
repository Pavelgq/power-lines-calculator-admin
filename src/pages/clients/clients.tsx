import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

import {
  getClientsFetch,
  selectAllClients,
  selectIsLoadingClient,
} from "../../store/clientsStore";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ClientCard } from "../../components";
import { CreateClientForm } from "../../components/molecules/CreateClientForm/CreateClientForm";
import { ClientTable } from "../../components/molecules/ClientTable/ClientTable";
import { useWindowSize } from "../../hooks/useWindowsSize";
import { ClientCardList } from "../../components/molecules/ClientCardList/ClietnCardList";
import { ClientsList } from "../../components/molecules/ClientsList/ClientsList";

export function Clients(): JSX.Element {
  const { clientId } = useParams();
  const [windowsX, windowsY] = useWindowSize();
  const [token] = useLocalStorage("token");
  const [viewToggle, setViewToggle] = useState("table");
  const [selectClient, setSelectClient] = useState(0);
  const clients = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);
  const dispatch = useDispatch();
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);

  const handleOpenCreate = () => {
    setSelectClient(0);
    setOpenAddClientDialog(true);
  };

  useEffect(() => {
    dispatch(getClientsFetch({ token }));
    return () => {};
  }, []);

  if (clientId) {
    return <Outlet />;
  }

  return (
    <main>
      <Container>
        <ClientsList />
      </Container>
    </main>
  );
}
