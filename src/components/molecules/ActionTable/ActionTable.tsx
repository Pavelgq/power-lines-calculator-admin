import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ActionTableInterface } from "./ActionTable.props";
import { selectAllClients } from "../../../store/clientsStore";
import { DownloadFile } from "../DownloadFile/DownloadFile";
import { firstUpperChar } from "../../../helpers/format";
import { Categories, ProgramType } from "../../../interfaces/action.interface";
import { ActionParam } from "../ActionParam/ActionParam";
import { Loading } from "../../atoms/Loading/Loading";
import { selectIsLoadingActions } from "../../../store/actionStore";
import styles from "./ActionTable.module.css";
import { TableCollapsibleRow } from "../TableCollapsibleRow/TableCollapsibleRow";

export interface ActionColumnParamsI {
  field: string;
  headerName: string;
  width: number;
  numeric: boolean;
  sorting: boolean;
  search: boolean;
}

const columns: ActionColumnParamsI[] = [
  {
    field: "id",
    headerName: "№",
    width: 20,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "name",
    headerName: "ФИО",
    width: 90,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "date",
    headerName: "Время",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "program_type",
    headerName: "Событие",
    width: 70,
    numeric: false,
    sorting: false,
    search: true,
  },
  {
    field: "project_name",
    headerName: "Название",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "params",
    headerName: "Параметры",
    width: 120,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "filePath",
    headerName: "Данные",
    width: 20,
    numeric: false,
    sorting: false,
    search: false,
  },
];

export function ActionTable({
  clientId = 0,
  data,
  limit,
  page,
  total,
  sort,
  handleChangePage,
  handleChangeLimit,
  handleSort,
}: ActionTableInterface): JSX.Element {
  const clients = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingActions);

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
              {columns
                .filter((col) => col.field !== "filePath")
                .map((n) => (
                  <TableCell
                    key={n.field}
                    align="center"
                    sx={{ width: n.width }}
                  >
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number(total)}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
      />
    </>
  );
}
