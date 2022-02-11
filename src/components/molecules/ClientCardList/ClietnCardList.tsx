import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ClientCard } from "../..";
import { selectAllClients, selectAllIds } from "../../../store/clientsStore";

interface ClientCardListProps {}

export function ClientCardList() {
  const data = useSelector(selectAllClients);
  const allIds = useSelector(selectAllIds);

  if (!allIds.length) {
    return {} as JSX.Element;
  }
  return (
    <>
      {allIds.map((clientId: number) => (
        <Grid item key={clientId}>
          <ClientCard client={data[clientId]} />
        </Grid>
      ))}
    </>
  );
}
