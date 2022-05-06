import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AdminFullInterface } from "../../../interfaces/admin.interface";
import {
  deleteAdminFetch,
  getAdminsFetch,
  selectAllAdmins,
} from "../../../store/adminStore";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";
import { AdminRowMenu } from "../AdminRowMenu/AdminRowMenu";

const columns = [
  { field: "id", headerName: "№", width: 70 },
  { field: "login", headerName: "Логин", width: 130 },
  { field: "status", headerName: "Статус", width: 130 },
  // { field: "action", headerName: "Действия", width: 50 },
];

export function AdminsTable() {
  const dispatch = useDispatch();
  const [adminsData, setAdminsData] = useState<AdminFullInterface[]>([]);
  const admins = useSelector(selectAllAdmins);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    const newAdmins = admins.slice();
    setAdminsData(
      newAdmins.length ? newAdmins.sort((a, b) => (a.id > b.id ? 1 : -1)) : []
    );
  }, [admins]);

  useEffect(() => {
    dispatch(getAdminsFetch({ token }));
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} size="small">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminsData.map((admin, i) => (
            <TableRow key={admin.login}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{admin.login}</TableCell>
              <TableCell>{admin.status}</TableCell>
              <TableCell>
                <AdminRowMenu id={admin.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
