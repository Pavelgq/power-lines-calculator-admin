import { Box, Button, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  downloadActionsFetch,
  selectIsLoadingActions,
} from "../../../store/actionStore";
import { Loading } from "../../atoms/Loading/Loading";
import { actionsRowsPerPageOptions } from "../../../data/actionData";
import { ActionTableInterface } from "../ActionTable/ActionTable.props";
import { ActionCard } from "../ActionCard/ActionCard";
import styles from "../ActionTable/ActionTable.module.css";

export function ActionCardList({
  data,
  limit,
  page,
  total,
  programType,
  handleChangePage,
  handleChangeLimit,
}: ActionTableInterface): JSX.Element {
  const isLoading = useSelector(selectIsLoadingActions);
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  const handleExcel = () => {
    dispatch(downloadActionsFetch({ token, programType: Number(programType) }));
  };

  if (isLoading && (!data || data.length === 0)) {
    return <Loading />;
  }

  if (!data?.length) {
    return (
      <span className={styles.notFound}>Действий не найдено</span>
    );
  }

  return (
    <Box sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          width: "100%",
          minWidth: 0,
        }}
      >
        {data.map((act) => (
          <ActionCard key={act.id} action={act} />
        ))}
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 1,
        }}
      >
        <TablePagination
          rowsPerPageOptions={[...actionsRowsPerPageOptions]}
          component="div"
          count={Number(total)}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
          labelRowsPerPage="Строк:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`
          }
          sx={{
            width: "100%",
            "& .MuiTablePagination-toolbar": {
              flexWrap: "wrap",
              justifyContent: "center",
              px: 0,
            },
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleExcel}
          sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
        >
          Сохранить в Excel
        </Button>
      </Box>
    </Box>
  );
}
