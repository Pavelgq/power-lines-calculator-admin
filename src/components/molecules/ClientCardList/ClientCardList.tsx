import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo, useRef } from "react";
import { ClientCard } from "../..";
import {
  selectAllClients,
  selectIsLoadingClient,
} from "../../../store/clientsStore";
import { Loading } from "../../atoms/Loading/Loading";
import { ClientTableProps } from "../ClientTable/ClientTable.props";
import { useTableSearchHighlights } from "../../../hooks/useTableSearchHighlights";

export function ClientCardList({
  items,
  searchValue = "",
}: ClientTableProps) {
  const data = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);
  const listRootRef = useRef<HTMLDivElement>(null);
  const highlightLayoutKey = useMemo(() => items.join(","), [items]);
  useTableSearchHighlights(listRootRef, searchValue, highlightLayoutKey);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div ref={listRootRef}>
      <Grid container gap={2}>
        {items.length > 0 &&
          items.map((clientId: number) => (
            <Grid item key={clientId}>
              <ClientCard
                client={data[clientId]}
                searchValue={searchValue}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
