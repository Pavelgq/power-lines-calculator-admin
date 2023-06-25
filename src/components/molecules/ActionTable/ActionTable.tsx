import {
  TableContainer,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ActionTableInterface } from "./ActionTable.props";
import { selectAllClients } from "../../../store/clientsStore";
import { Loading } from "../../atoms/Loading/Loading";
import {
  downloadActionsFetch,
  selectIsLoadingActions,
} from "../../../store/actionStore";
import styles from "./ActionTable.module.css";
import { TableCollapsibleRow } from "../TableCollapsibleRow/TableCollapsibleRow";
import { columns, headerColumns } from "../../../data/actionData";
import useLocalStorage from "../../../hooks/useLocalStorage";

export function ActionTable({
  clientId = 0,
  data,
  limit,
  page,
  total,
  sort,
  programType,
  handleChangePage,
  handleChangeLimit,
  handleSort,
}: ActionTableInterface): JSX.Element {
  const clients = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingActions);
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(downloadActionsFetch({ token, programType: Number(programType) }));
  };

  const dataRows = () => {
    const dataView =
      data &&
      data.map((act) => (
        <TableCollapsibleRow key={act.id} actionData={act} columns={columns} />
      ));
    if (!isLoading && data && data.length) {
      return dataView;
    }
    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell>
            <span className={styles.notFound}>Действий не найдено</span>
          </TableCell>
        </TableRow>
      );
    }
    return <Loading />;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label={
            clientId
              ? `Таблица действий клиента ${clients[clientId].last_name}`
              : "Таблица действий всех клиентов"
          }
          size="small"
        >
          <TableHead>
            <TableRow>
              {headerColumns.map((n) => (
                <TableCell key={n.field} align="center" sx={{ width: n.width }}>
                  <span>{n.headerName}</span>
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ width: 34 }}
                className="noPadding"
              >
                <span> </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataRows()}</TableBody>
        </Table>
      </TableContainer>
      <div className={styles.wrapper}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Number(total)}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
        />
        <Button onClick={handleClick} className={styles.saveButton}>
          Сохранить в Excel
        </Button>
      </div>
    </>
  );
}
