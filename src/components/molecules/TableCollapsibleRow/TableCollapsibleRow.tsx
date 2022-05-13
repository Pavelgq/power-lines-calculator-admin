import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import { useSelector } from "react-redux";
import { firstUpperChar } from "../../../helpers/format";
import {
  ProgramType,
  Categories,
  ActionFullInterface,
  ActionSemiFullInterface,
} from "../../../interfaces/action.interface";
import { DownloadFile } from "../DownloadFile/DownloadFile";
import { selectAllClients } from "../../../store/clientsStore";
import { TableCollapsibleRowProps } from "./TableCollapsibleRow.props";
import { ActionParam } from "../ActionParam/ActionParam";

export function TableCollapsibleRow({
  actionData,
  columns,
}: TableCollapsibleRowProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const clients = useSelector(selectAllClients);

  const mainTableRow = (action: ActionFullInterface) => (
    <>
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[0].width }}
        className="no-wrap-text fix-table-cell"
      >
        {clients[action.client_id].ordinal}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[1].width }}
        className="no-wrap-text fix-table-cell"
      >
        <Link to={`/clients/${action.client_id}`}>
          {firstUpperChar(clients[action.client_id].last_name)} <br />
          {firstUpperChar(clients[action.client_id].first_name)}
        </Link>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[2].width }}
        className="no-wrap-text fix-table-cell"
      >
        {moment(action.date, moment.ISO_8601).format("DD.MM.YYYY")}
        <br />
        {moment(action.date, moment.ISO_8601).format("HH:mm")}
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[3].width }}
        className="no-wrap-text fix-table-cell"
      >
        <Typography variant="body2">
          {(action.group?.length &&
            Math.round(
              moment
                .duration(
                  moment(action.group[action.group.length - 1].date || "").diff(
                    moment(action.date)
                  )
                )
                .asMinutes()
            )) ||
            "< 1"}{" "}
          мин.
        </Typography>
      </TableCell>

      <TableCell component="th" scope="row" align="center">
        <Typography variant="body2">
          {ProgramType[action.program_type]}
        </Typography>
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[4].width }}
        className="no-wrap-text fix-table-cell"
      >
        <ActionParam params={action.params} type={action.program_type} />
      </TableCell>
    </>
  );
  const collapsedTableRow = (action: ActionSemiFullInterface) => (
    <>
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[2].width }}
        className="no-wrap-text fix-table-cell"
      >
        {moment(action.date, moment.ISO_8601).format("DD.MM.YYYY")}
        <br />
        {moment(action.date, moment.ISO_8601).format("HH:mm")}
      </TableCell>

      <TableCell component="th" scope="row" align="center">
        <Typography variant="body2">
          {ProgramType[action.program_type]}
        </Typography>
        <Typography variant="body2">
          {Categories[action.type] as string}
        </Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[4].width }}
        className="no-wrap-text fix-table-cell"
      >
        <Typography variant="body2">{action.project_name}</Typography>
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{ maxWidth: columns[5].width }}
        className="no-wrap-text fix-table-cell"
      >
        <ActionParam params={action.params} type={action.program_type} />
      </TableCell>

      <TableCell component="th" scope="row" align="center">
        <DownloadFile path={action.path_to_data}>
          <FileDownloadIcon />
        </DownloadFile>
      </TableCell>
    </>
  );
  return (
    <>
      <TableRow>
        {/* Обычная строка */}
        {mainTableRow(actionData)}
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{ maxWidth: 15 }}
          className="noPadding no-wrap-text fix-table-cell"
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }}> */}
            <Table
              size="small"
              aria-label="История сессии"
              sx={{ minWidth: 650 }}
            >
              <TableHead>
                <TableRow>
                  {columns
                    .filter((col) => col.field !== "id" && col.field !== "name")
                    .map((n) => (
                      <TableCell
                        key={n.field}
                        align="center"
                        sx={{ width: n.width }}
                      >
                        <span>{n.headerName}</span>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={actionData.id}>
                  {collapsedTableRow(actionData)}
                </TableRow>
                {actionData.group &&
                  actionData.group.map((subAction) => (
                    <TableRow key={subAction.id}>
                      {collapsedTableRow(subAction)}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* </Box> */}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
