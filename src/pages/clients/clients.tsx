import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

import {
  getClientsFetch,
  selectAcceptClients,
  selectAllClients,
  selectIsLoadingClient,
} from "../../store/clientsStore";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useWindowSize } from "../../hooks/useWindowsSize";
import { ClientsList, ClientTable } from "../../components";

export function Clients(): JSX.Element {
  const { clientId } = useParams();
  const [windowsX, windowsY] = useWindowSize();
  const [token] = useLocalStorage("token");
  const [viewToggle, setViewToggle] = useState("table");
  const [selectClient, setSelectClient] = useState(0);
  const dispatch = useDispatch();
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);

  useEffect(() => {
    dispatch(getClientsFetch({ token }));
    return () => {};
  }, []);

  return (
    <main>
      <Container>
        <ClientsList
          Component={ClientTable}
          selectForIds={selectAcceptClients}
        />
      </Container>
    </main>
  );
}
