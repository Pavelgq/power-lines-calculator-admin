import {
  Box,
  Button,
  Grid,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { ClientKey } from "../..";
import { firstUpperChar, formatePhone } from "../../../helpers/format";
import styles from "./ClientTable.module.css";
import { ClientTableInterface } from "./ClientTable.props";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { deleteClientFetch } from "../../../store/clientsStore";
import useLocalStorage from "../../../hooks/useLocalStorage";

const columns = [
  { field: "name", headerName: "ФИО", width: 70 },
  { field: "company", headerName: "Компания", width: 130 },
  { field: "office_position", headerName: "Должность", width: 130 },
  {
    field: "phone_number",
    headerName: "Телефон",
    width: 90,
  },
  { field: "email", headerName: "Email", width: 130 },
  { field: "acceptKey", headerName: "Ключ", width: 130 },
  { field: "actions", headerName: "", width: 130 },
];

export function ClientTable({ data }: ClientTableInterface): JSX.Element {
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [token] = useLocalStorage("token");
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useDispatch();

  const handleToggleAlert = () => {
    setOpenAlert(!openAlert);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (clientId: string) => {
    console.log("delete");
    dispatch(deleteClientFetch({ token, id: clientId }));
    setOpenAlert(!openAlert);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="Таблица клиентов"
          size={dense ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              {columns.map((n) => (
                <TableCell key={n.field}>{n.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client) => (
                <TableRow
                  selected
                  key={client}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/clients/${client}`}>
                      <Typography variant="body1" component="h3">
                        {firstUpperChar(data[client].first_name)}{" "}
                        {firstUpperChar(data[client].last_name)}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data[client].company.toUpperCase()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {firstUpperChar(data[client].office_position)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <MuiLink href={`tel:${data[client].phone_number}`}>
                      <Typography noWrap variant="body2">
                        {formatePhone(data[client].phone_number)}
                      </Typography>
                    </MuiLink>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <MuiLink href={`tel:${data[client].email}`}>
                      {data[client].email}
                    </MuiLink>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ClientKey
                      clientId={Number(client)}
                      keyValue={data[client].client_key}
                      lifetime={data[client].valid_until}
                    />
                  </TableCell>
                  <TableCell>
                    <Grid container wrap="nowrap" spacing={0.5}>
                      <Grid item xs="auto">
                        <Button variant="contained" size="small">
                          <EditIcon />
                        </Button>
                      </Grid>
                      <Grid item xs="auto">
                        <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          onClick={handleToggleAlert}
                        >
                          <ClearIcon />
                        </Button>
                      </Grid>
                    </Grid>

                    <AlertDialog
                      open={openAlert}
                      handleClose={handleToggleAlert}
                      handleChange={() => handleDelete(client)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Object.keys(data).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
