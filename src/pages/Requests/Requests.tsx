import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  getClientsFetch,
  selectRequestClients,
} from "../../store/clientsStore";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useWindowSize } from "../../hooks/useWindowsSize";
import { RequestsTable } from "../../components/molecules/RequestsTable/RequestsTable";
import { RequestsList } from "../../components/molecules/RequestsList/RequestsList";

export function Requests(): JSX.Element {
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
        <RequestsList
          Component={RequestsTable}
          selectForIds={selectRequestClients}
        />
      </Container>
    </main>
  );
}
