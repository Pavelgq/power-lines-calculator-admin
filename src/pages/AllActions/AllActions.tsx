import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { ActionList } from "../../components/molecules/ActionList/ActionList";

export function AllActions() {
  const { clientId } = useParams();

  return (
    <main>
      <Container>
        <ActionList clientId={clientId} />
      </Container>
    </main>
  );
}
