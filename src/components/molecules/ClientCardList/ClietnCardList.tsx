import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ClientCard } from "../..";
import {
  selectAllClients,
  selectAllIds,
  selectIsLoadingClient,
} from "../../../store/clientsStore";
import { Loading } from "../../atoms/Loading/Loading";

interface ClientCardListProps {
  items: number[];
}

export function ClientCardList({ items }: ClientCardListProps) {
  const data = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {items.length &&
        items.map((clientId: number) => (
          <Grid item key={clientId}>
            <ClientCard client={data[clientId]} />
          </Grid>
        ))}
    </div>
  );
}
