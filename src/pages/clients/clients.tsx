import { Button, Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  downloadClientsFetch,
  selectAcceptClients,
} from "../../store/clientsStore";

import { useWindowSize } from "../../hooks/useWindowsSize";
import { ClientCardList, ClientsList, ClientTable } from "../../components";
import useLocalStorage from "../../hooks/useLocalStorage";

export function Clients(): JSX.Element {
  const { clientId } = useParams();
  const [windowsX, windowsY] = useWindowSize();
  const dispatch = useDispatch();
  const token = useLocalStorage("token");

  const handleClick = () => {
    dispatch(downloadClientsFetch({ token }));
  };
  return (
    <main>
      <Container>
        {windowsX > 1050 ? (
          <ClientsList
            Component={ClientTable}
            selectForIds={selectAcceptClients}
          />
        ) : (
          <ClientsList
            Component={ClientCardList}
            selectForIds={selectAcceptClients}
          />
        )}
        <Button onClick={handleClick}>Сохранить в Excel</Button>
      </Container>
    </main>
  );
}
