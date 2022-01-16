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
import { useDispatch } from "react-redux";
import { ClientKey } from "../..";
import { ActionTableInterface } from "./ActionTable.props";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { deleteClientFetch } from "../../../store/clientsStore";

const columns = [
  { field: "category", headerName: "Категория", width: 70 },
  { field: "project_name", headerName: "Название", width: 70 },
  { field: "date", headerName: "Дата", width: 130 },
  {
    field: "filePath",
    headerName: "Данные",
    width: 90,
  },
  { field: "acceptKey", headerName: "Используемый ключ", width: 130 },
];

export function ActionTable({
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
  if (!data) {
    return <span>Этот клиент не совершал пока действий</span>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label={`Таблица действий клиента "тут имя"`}
          size="small"
        >
          <TableHead>
            <TableRow>
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
                <TableCell component="th" scope="row">
                  <Typography>{act.type}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography>{act.project_name}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  {act.date}
                </TableCell>
                <TableCell component="th" scope="row">
                  {act.path_to_data}
                </TableCell>
                <TableCell component="th" scope="row">
                  {act.accept_key}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
      />
    </>
  );
}
