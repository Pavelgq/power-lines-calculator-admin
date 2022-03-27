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

const columns = [
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
        <TableRow
          key={act.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell
            component="th"
            scope="row"
            align="center"
            sx={{ maxWidth: columns[0].width }}
            className="no-wrap-text fix-table-cell"
          >
            {clients[act.client_id].ordinal}
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            align="center"
            sx={{ maxWidth: columns[1].width }}
            className="no-wrap-text fix-table-cell"
          >
            <Link to={`/clients/${act.client_id}`}>
              {firstUpperChar(clients[act.client_id].last_name)} <br />
              {firstUpperChar(clients[act.client_id].first_name)}
            </Link>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            align="center"
            sx={{ maxWidth: columns[2].width }}
            className="no-wrap-text fix-table-cell"
          >
            {moment(act.date, moment.ISO_8601).format("DD.MM.YYYY")}
            <br />
            {moment(act.date, moment.ISO_8601).format("hh:mm")}
          </TableCell>

          <TableCell component="th" scope="row" align="center">
            <Typography variant="body2">
              {ProgramType[act.program_type]}
            </Typography>
            <Typography variant="body2">
              {Categories[act.type] as string}
            </Typography>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            align="center"
            sx={{ maxWidth: columns[5].width }}
            className="no-wrap-text fix-table-cell"
          >
            <Typography variant="body2">{act.project_name}</Typography>
          </TableCell>

          <TableCell
            component="th"
            scope="row"
            align="center"
            sx={{ maxWidth: columns[6].width }}
            className="no-wrap-text fix-table-cell"
          >
            <ActionParam params={act.params} type={act.program_type} />
          </TableCell>

          <TableCell component="th" scope="row" align="center">
            <DownloadFile path={act.path_to_data}>
              <FileDownloadIcon />
            </DownloadFile>
          </TableCell>
        </TableRow>
      ));
    if (!isLoading && data && data.length) {
      return dataView;
    }
    if (!data || data.length === 0) {
      return <span className={styles.notFound}>Действий не найдено</span>;
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
              : "Таблица действий для всех клиентов"
          }
          size="small"
        >
          <TableHead>
            <TableRow>
              {columns.map((n) => (
                <TableCell key={n.field} align="center" sx={{ width: n.width }}>
                  <span>{n.headerName}</span>
                </TableCell>
              ))}
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
