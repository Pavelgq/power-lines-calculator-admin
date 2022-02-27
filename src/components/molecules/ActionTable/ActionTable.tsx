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
  Button,
  TableSortLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Paragliding } from "@mui/icons-material";
import { ClientKey } from "../..";
import { ActionTableInterface } from "./ActionTable.props";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import {
  deleteClientFetch,
  selectAllClients,
} from "../../../store/clientsStore";
import { DownloadFile } from "../DownloadFile/DownloadFile";
import { firstUpperChar } from "../../../helpers/format";
import { ProgramType } from "../../../interfaces/action.interface";
import { ActionParam } from "../ActionParam/ActionParam";
import { Loading } from "../../atoms/Loading/Loading";
import { selectIsLoadingActions } from "../../../store/actionStore";
import styles from "./ActionTable.module.css";

const columns = [
  {
    field: "id",
    headerName: "№",
    width: 70,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "name",
    headerName: "ФИО",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "date",
    headerName: "Время",
    width: 130,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "category",
    headerName: "Категория",
    width: 70,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "program_type",
    headerName: "Программа",
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
    width: 70,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "filePath",
    headerName: "Данные",
    width: 90,
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
          <TableCell component="th" scope="row">
            {clients[act.client_id].ordinal}
          </TableCell>
          <TableCell component="th" scope="row">
            <Link to={`/clients/${act.client_id}`}>
              {firstUpperChar(clients[act.client_id].last_name)}{" "}
              {firstUpperChar(clients[act.client_id].first_name)}
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            {moment(act.date, moment.ISO_8601).format("DD.MM.YYYY hh:mm")}
          </TableCell>
          <TableCell component="th" scope="row">
            <Typography>{act.type}</Typography>
          </TableCell>

          <TableCell component="th" scope="row">
            <Typography>{ProgramType[act.program_type]}</Typography>
          </TableCell>

          <TableCell component="th" scope="row">
            <Typography>{act.project_name}</Typography>
          </TableCell>

          <TableCell component="th" scope="row">
            <ActionParam params={act.params} type={act.program_type} />
          </TableCell>

          <TableCell component="th" scope="row">
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
                <TableCell
                  key={n.field}
                  align={n.numeric ? "right" : "left"}
                  sx={{ maxWidth: n.width }}
                >
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
