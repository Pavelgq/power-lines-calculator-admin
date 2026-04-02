import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { ActionList } from "../../components/molecules/ActionList/ActionList";

export function AllActions() {
  const { clientId } = useParams();

  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 2 },
          boxSizing: "border-box",
        }}
      >
        <ActionList clientId={clientId} />
      </Container>
    </main>
  );
}
