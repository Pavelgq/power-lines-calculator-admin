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
import { columns } from "../ClientsList/ClientsList";

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
        <Table
          aria-label="Таблица клиентов"
          sx={{ minWidth: 1000 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              {columns.map((n) => (
                <TableCell key={n.field} align="center" sx={{ width: n.width }}>
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
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ maxWidth: columns[0].width }}
                      className="no-wrap-text fix-table-cell"
                    >
                      <Typography variant="body2" component="h3">
                        {data[client].ordinal}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ maxWidth: columns[1].width }}
                      className="no-wrap-text fix-table-cell"
                    >
                      <Typography variant="body2" component="h3">
                        <Link to={`/actions/${client}`}>
                          {firstUpperChar(data[client].last_name)}
                          <br />
                          {firstUpperChar(data[client].first_name)}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ maxWidth: columns[2].width }}
                      className="no-wrap-text fix-table-cell"
                    >
                      {data[client].company.toUpperCase()}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ maxWidth: columns[3].width }}
                    >
                      {firstUpperChar(data[client].office_position)}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <MuiLink href={`tel:${data[client].phone_number}`}>
                        <Typography noWrap variant="body2">
                          {formatePhone(data[client].phone_number)}
                        </Typography>
                        <MuiLink href={`tel:${data[client].email}`}>
                          {data[client].email}
                        </MuiLink>
                      </MuiLink>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      className="no-wrap-text fix-table-cell"
                    >
                      <ClientKey
                        clientId={Number(client)}
                        keyValue={data[client].client_key}
                        lifetime={data[client].valid_until}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
