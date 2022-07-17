import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { selectAcceptClients } from "../../store/clientsStore";

import { useWindowSize } from "../../hooks/useWindowsSize";
import { ClientCardList, ClientsList, ClientTable } from "../../components";

export function Clients(): JSX.Element {
  const { clientId } = useParams();
  const [windowsX, windowsY] = useWindowSize();

  return (
    <main>
      <Container>
        {windowsX > 1000 ? (
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
      </Container>
    </main>
  );
}
