import {
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
  selectAdmins,
} from "../../../store/adminStore";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "login", headerName: "Логин", width: 130 },
  { field: "status", headerName: "Статус", width: 130 },
];

export function AdminsTable() {
  const dispatch = useDispatch();
  const [adminsData, setAdminsData] = useState<AdminFullInterface[]>([]);
  const admins = useSelector(selectAdmins);
  const [token] = useLocalStorage("token");

  const handleDelete = (id: number) => {
    console.log("Удалить", id);
    dispatch(deleteAdminFetch({ token, id }));
  };

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
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminsData.map((admin, i) => (
            <TableRow key={admin.login}>
              <TableCell>{admin.id}</TableCell>
              <TableCell>{admin.login}</TableCell>
              <TableCell>{admin.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(admin.id)}
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
