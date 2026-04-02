import { Box, TablePagination } from "@mui/material";
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
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}: ClientTableProps) {
  const data = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);
  const listRootRef = useRef<HTMLDivElement>(null);

  const pageItems = useMemo(
    () => items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [items, page, rowsPerPage]
  );

  const highlightLayoutKey = useMemo(
    () => `${page}-${rowsPerPage}-${pageItems.join(",")}`,
    [page, rowsPerPage, pageItems]
  );

  useTableSearchHighlights(listRootRef, searchValue, highlightLayoutKey);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      ref={listRootRef}
      sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          width: "100%",
          minWidth: 0,
          "@media (min-width: 800px)": {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        {pageItems.length > 0 ? (
          pageItems.map((clientId: number) => (
            <ClientCard
              key={clientId}
              client={data[clientId]}
              searchValue={searchValue}
            />
          ))
        ) : (
          <Box
            sx={{
              py: 3,
              textAlign: "center",
              color: "text.secondary",
              gridColumn: "1 / -1",
            }}
          >
            Нет клиентов по текущим фильтрам
          </Box>
        )}
      </Box>
      {items.length > 0 ? (
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Строк:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`
          }
          sx={{
            width: "100%",
            mt: 1,
            "& .MuiTablePagination-toolbar": {
              flexWrap: "wrap",
              justifyContent: "center",
              px: 0,
            },
          }}
        />
      ) : null}
    </Box>
  );
}
