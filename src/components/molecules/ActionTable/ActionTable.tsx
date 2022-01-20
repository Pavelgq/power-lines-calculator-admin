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

const columns = [
  { field: "category", headerName: "Категория", width: 70 },
  { field: "program_type", headerName: "Программа", width: 70 },
  { field: "project_name", headerName: "Название", width: 70 },
  { field: "params", headerName: "Параметры", width: 70 },
  { field: "date", headerName: "Дата", width: 130 },

  { field: "acceptKey", headerName: "Ключ", width: 130 },
  {
    field: "filePath",
    headerName: "Данные",
    width: 90,
  },
];

export function ActionTable({
  clientId = 0,
  data,
  limit,
  page,
  total,
  handleChangePage,
  handleChangeLimit,
}: ActionTableInterface): JSX.Element {
  // const handleDelete = () => {
  //   dispatch(deleteClientFetch({ token, id: client.id }));
  // };
  const clients = useSelector(selectAllClients);
  console.log("action table", total);
  if (!data) {
    return <span>Этот клиент не совершал пока действий</span>;
  }

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
              {clientId ? "" : <TableCell>ФИО</TableCell>}
              {columns.map((n) => (
                <TableCell key={n.field}>{n.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((act) => (
              <TableRow
                key={act.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {clientId ? (
                  ""
                ) : (
                  <TableCell component="th" scope="row">
                    {firstUpperChar(clients[act.client_id].first_name)}{" "}
                    {firstUpperChar(clients[act.client_id].last_name)}
                  </TableCell>
                )}
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
                  <Typography>{act.params}</Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  {moment(act.date, moment.ISO_8601).format("DD.MM.YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {act.accept_key}
                </TableCell>
                <TableCell component="th" scope="row">
                  <DownloadFile path={act.path_to_data}>
                    <FileDownloadIcon />
                  </DownloadFile>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
