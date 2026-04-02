import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { firstUpperChar } from "../../../helpers/format";
import {
  ActionFullInterface,
  ActionSemiFullInterface,
  Categories,
  ProgramType,
} from "../../../interfaces/action.interface";
import { selectAllClients } from "../../../store/clientsStore";
import { ActionParam } from "../ActionParam/ActionParam";
import { DownloadFile } from "../DownloadFile/DownloadFile";

const denseParamSx = {
  "& .MuiGrid-root.MuiGrid-container": { marginTop: 0, marginBottom: 0 },
  "& .MuiGrid-item": { paddingTop: "2px", paddingBottom: 0 },
  "& .MuiTypography-root": {
    fontSize: "0.8125rem",
    lineHeight: 1.35,
  },
} as const;

function sessionMinutesLabel(action: ActionFullInterface): string {
  const minutes =
    action.group?.length &&
    Math.round(
      moment
        .duration(
          moment(action.group[action.group.length - 1].date || "").diff(
            moment(action.date)
          )
        )
        .asMinutes()
    );
  return minutes ? `${minutes}` : "< 1";
}

function SessionStepRow({ action }: { action: ActionSemiFullInterface }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        px: 1.25,
        py: 0.75,
        borderRadius: 1,
        bgcolor: "grey.50",
        borderColor: "divider",
      }}
    >
      <Stack spacing={0.35}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={1}
        >
          <Box
            sx={{
              minWidth: 0,
              flex: 1,
              display: "flex",
              flexWrap: "wrap",
              columnGap: 0.75,
              rowGap: 0,
              alignItems: "baseline",
            }}
          >
            <Typography
              component="span"
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              sx={{ lineHeight: 1.2 }}
            >
              {moment(action.date, moment.ISO_8601).format("HH:mm")}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{ lineHeight: 1.2, fontWeight: 600 }}
            >
              {Categories[action.type] as string}
            </Typography>
            {action.project_name ? (
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {action.project_name}
              </Typography>
            ) : null}
          </Box>
          <Box sx={{ flexShrink: 0, mt: -0.25 }}>
            <DownloadFile path={action.path_to_data}>
              <FileDownloadIcon sx={{ fontSize: 20 }} />
            </DownloadFile>
          </Box>
        </Stack>
        <Box sx={denseParamSx}>
          <ActionParam params={action.params} type={action.program_type} />
        </Box>
      </Stack>
    </Paper>
  );
}

export function ActionCard({ action }: { action: ActionFullInterface }) {
  const [open, setOpen] = useState(false);
  const clients = useSelector(selectAllClients);
  const client = clients[action.client_id];
  const programLabel = ProgramType[action.program_type] ?? "";

  return (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: 2,
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack spacing={1.25}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1.5}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                № {client?.ordinal ?? "—"}
              </Typography>
              {client ? (
                <MuiLink
                  component={RouterLink}
                  to={`/clients/${action.client_id}`}
                  variant="h6"
                  fontWeight={600}
                  underline="hover"
                  sx={{
                    display: "block",
                    wordBreak: "break-word",
                    lineHeight: 1.25,
                    mt: 0.25,
                  }}
                >
                  {firstUpperChar(client.last_name)}{" "}
                  {firstUpperChar(client.first_name)}
                </MuiLink>
              ) : (
                <Typography variant="body2" sx={{ mt: 0.25 }}>
                  Клиент #{action.client_id}
                </Typography>
              )}
            </Box>
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={0.25}
              sx={{ flexShrink: 0, maxWidth: "42%" }}
            >
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{
                  textAlign: "right",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  pt: 0.25,
                }}
              >
                {programLabel}
              </Typography>
              <IconButton
                aria-label={open ? "Свернуть сессию" : "Развернуть сессию"}
                size="small"
                onClick={() => setOpen((v) => !v)}
                sx={{ flexShrink: 0, mt: -0.5 }}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.35, sm: 3 }}
            sx={{ color: "text.secondary" }}
          >
            <Typography variant="body2" sx={{ fontSize: "0.9375rem" }}>
              {moment(action.date, moment.ISO_8601).format("DD.MM.YYYY HH:mm")}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.9375rem" }}>
              Длительность: {sessionMinutesLabel(action)} мин
            </Typography>
          </Stack>

          <Box sx={{ minWidth: 0, ...denseParamSx, "& .MuiTypography-root": { fontSize: "0.9375rem", lineHeight: 1.45 } }}>
            <ActionParam params={action.params} type={action.program_type} />
          </Box>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 0.75, fontWeight: 700, letterSpacing: 0.02 }}
            >
              История сессии
            </Typography>
            <Stack spacing={0.75}>
              <SessionStepRow action={action} />
              {action.group?.map((sub) => (
                <SessionStepRow key={sub.id} action={sub} />
              ))}
            </Stack>
          </Collapse>
        </Stack>
      </CardContent>
    </Card>
  );
}
