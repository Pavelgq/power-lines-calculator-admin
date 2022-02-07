import {
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";

import { ClientKey } from "../..";
import { firstUpperChar, formatePhone } from "../../../helpers/format";
import { ClientTableInterface } from "./ClientTable.props";
import {
  selectAllClients,
  selectAllIds,
  selectTableIds,
} from "../../../store/clientsStore";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";
import { useSortableData } from "../../../hooks/useSortableData";
import { ClientDataInterface } from "../../../interfaces/client.interface";

const columns = [
  { field: "id", headerName: "№", width: 70, numeric: false, sorting: true },
  {
    field: "firstname",
    headerName: "Имя",
    width: 70,
    numeric: false,
    sorting: true,
  },
  {
    field: "lastname",
    headerName: "Фамилия",
    width: 70,
    numeric: false,
    sorting: true,
  },
  {
    field: "company",
    headerName: "Компания",
    width: 130,
    numeric: false,
    sorting: true,
  },
  {
    field: "office_position",
    headerName: "Должность",
    width: 130,
    numeric: false,
    sorting: false,
  },
  {
    field: "phone_number",
    headerName: "Телефон",
    width: 90,

    sorting: false,
  },
  { field: "email", headerName: "Email", width: 130, sorting: false },
  { field: "acceptKey", headerName: "Ключ", width: 130, sorting: false },
  { field: "actions", headerName: "", width: 130, sorting: false },
];

export function ClientTable({
  selectClient,
  setSelectClient,
}: ClientTableInterface): JSX.Element {
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [token] = useLocalStorage("token");

  const data = useSelector(selectAllClients);
  const tableIds = useSelector(selectTableIds);
  const allIds = useSelector(selectAllIds);

  const { items, sortConfig, sortingField } =
    useSortableData<ClientDataInterface>(allIds, data);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectClient = (
    event: React.MouseEvent<unknown>,
    newSelectClientId: number
  ) => {
    if (newSelectClientId === selectClient) {
      setSelectClient(0);
      return;
    }

    setSelectClient(newSelectClientId);
  };

  const createSortHandler = () => {
    console.log("sort");
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
                <TableCell key={n.field} align={n.numeric ? "right" : "left"}>
                  {n.sorting ? (
                    <TableSortLabel
                      active
                      direction={
                        sortConfig.field === n.field
                          ? sortConfig.direction
                          : "asc"
                      }
                      onClick={() => sortingField(n.field)}
                    >
                      {n.headerName}
                    </TableSortLabel>
                  ) : (
                    <span>{n.headerName}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allIds &&
              allIds
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client, index) => (
                  <TableRow
                    key={client}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                    onClick={(event) =>
                      handleSelectClient(event, Number(client))
                    }
                    role="checkbox"
                    aria-checked={selectClient === Number(client)}
                    tabIndex={-1}
                    selected={selectClient === Number(client)}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component="h3">
                        {tableIds[index + page * rowsPerPage]}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component="h3">
                        {firstUpperChar(data[client].first_name)}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component="h3">
                        {firstUpperChar(data[client].last_name)}
                      </Typography>
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
                    <TableCell component="th" scope="row">
                      <ClientRowMenu id={client} />
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
