import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ClientCard, RequestsCard } from "../..";
import {
  selectAllClients,
  selectAllIds,
  selectIsLoadingClient,
} from "../../../store/clientsStore";
import { Loading } from "../../atoms/Loading/Loading";

interface ClientCardListProps {
  items: number[];
}

export function RequestsCardList({ items }: ClientCardListProps) {
  const data = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Grid container gap={2}>
      {items.length &&
        items.map((clientId: number) => (
          <Grid item key={clientId}>
            <RequestsCard client={data[clientId]} />
          </Grid>
        ))}
    </Grid>
  );
}
