import {
  Link as MuiLink,
  Paper,
  Button,
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

import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { ClientKey } from "../..";
import { firstUpperChar, formatePhone } from "../../../helpers/format";
import { ClientTableProps } from "./ClientTable.props";
import {
  downloadClientsFetch,
  selectAllClients,
  selectIsLoadingClient,
} from "../../../store/clientsStore";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";
import { Loading } from "../../atoms/Loading/Loading";

import styles from "./ClientTable.module.css";
import { clientFields, columns } from "../../../data/clientsData";
import useLocalStorage from "../../../hooks/useLocalStorage";

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
}: ClientTableProps): JSX.Element {
  const location = useLocation();
  const data = useSelector(selectAllClients);
  const isLoading = useSelector(selectIsLoadingClient);
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }
  const handleClick = () => {
    dispatch(downloadClientsFetch({ token }));
  };

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
              {clientFields
                .map(
                  (field) =>
                    columns[columns.findIndex((el) => el.field === field)]
                )
                .map((n) => (
                  <TableCell
                    key={n.field}
                    align="center"
                    sx={{ width: n.width }}
                    className={styles.tableCell}
                  >
                    {n.sorting ? (
                      <TableSortLabel
                        className={styles.tableSortLabel}
                        active
                        direction={
                          sortConfig.field === n.field
                            ? sortConfig.direction
                            : "desc"
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
                    className={cn({ [styles.admin]: data[client].admin_flag })}
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
                      // className="no-wrap-text fix-table-cell"
                    >
                      {data[client].company}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ maxWidth: columns[3].width }}
                      className={styles.tableCell}
                    >
                      {firstUpperChar(data[client].office_position)}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      className={styles.tableCell}
                    >
                      <MuiLink href={`tel:${data[client].phone_number}`}>
                        <Typography noWrap variant="body2">
                          {
                            /* {formatePhone(data[client].phone_number)} */
                            data[client].phone_number
                          }
                        </Typography>
                      </MuiLink>
                      <MuiLink href={`tel:${data[client].email}`}>
                        {data[client].email}
                      </MuiLink>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      className={styles.tableCell}
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
      <div className={styles.wrapper}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button onClick={handleClick} className={styles.saveButton}>
          Сохранить в Excel
        </Button>
      </div>
    </>
  );
}
