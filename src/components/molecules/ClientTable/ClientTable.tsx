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

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { ClientKey } from "../..";
import { firstUpperChar, formatePhone } from "../../../helpers/format";
import { ClientTableInterface } from "./ClientTable.props";
import {
  selectAllClients,
  selectIsLoadingClient,
} from "../../../store/clientsStore";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";
import { Loading } from "../../atoms/Loading/Loading";

const columns = [
  {
    field: "ordinal",
    headerName: "№",
    width: 20,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "last_name",
    headerName: "Фамилия",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "first_name",
    headerName: "Имя",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "company",
    headerName: "Компания",
    width: 130,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "office_position",
    headerName: "Должность",
    width: 130,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "phone_number",
    headerName: "Телефон",
    width: 80,

    sorting: false,
    search: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
    sorting: false,
    search: false,
  },
  {
    field: "acceptKey",
    headerName: "Ключ",
    width: 130,
    sorting: false,
    search: false,
  },
  {
    field: "actions",
    headerName: "",
    width: 130,
    sorting: false,
    search: false,
  },
];

const searchFields = columns.filter((el) => el.search).map((el) => el.field);

export function ClientTable({
  searchValue,
  setSearchValue,
  sortConfig,
  sortingField,
  items,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}: ClientTableInterface): JSX.Element {
  const data = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Таблица клиентов" sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              {columns.map((n) => (
                <TableCell
                  key={n.field}
                  align={n.numeric ? "right" : "left"}
                  sx={{ maxWidth: n.width }}
                >
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
            {items &&
              items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client, index) => (
                  <TableRow
                    key={client}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component="h3">
                        {data[client].ordinal}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component="h3">
                        <Link to={`/actions/${client}`}>
                          {firstUpperChar(data[client].last_name)}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component="h3">
                        <Link to={`${client}`}>
                          {firstUpperChar(data[client].first_name)}
                        </Link>
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
