import { Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "../../../helpers/date";
import { ClientKeyProps } from "./ClientKey.props";
import { KeygenDialog } from "../KeygenDialog/KeygenDialog";
import styles from "./ClientKey.module.css";
import { selectAllClients } from "../../../store/clientsStore";

export function ClientKey({
  clientId,
  keyValue,
  lifetime = "",
}: ClientKeyProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openGenerate, setOpenGenerate] = useState(false);

  const clientData = useSelector(selectAllClients)[clientId];

  if (keyValue) {
    return (
      <Grid
        container
        spacing={0.5}
        direction="row"
        // wrap="nowrap"
        justifyContent="space-between"
        className={styles.container}
      >
        <Grid item>
          {!clientData.isAccept ? (
            <Chip label="Просрочен" color="error" variant="filled" />
          ) : (
            <Chip label={keyValue} color="secondary" variant="filled" />
            // <Typography variant="h5">{keyValue}</Typography>
          )}
          <Grid item xs={12}>
            <Typography variant="caption">
              до {moment(lifetime, moment.ISO_8601).format("D MMMM YYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={styles.compensator}>
      <KeygenDialog
        clientId={clientId}
        toggle={openGenerate}
        handleClose={setOpenGenerate}
      />
      <Chip label="Отсутствует" color="info" variant="filled" />
    </div>
  );
}
