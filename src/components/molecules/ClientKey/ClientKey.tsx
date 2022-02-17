import { Button, Chip, Grid, Link, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import moment from "../../../helpers/date";
import { ClientKeyProps } from "./ClientKey.props";
import { KeygenDialog } from "../KeygenDialog/KeygenDialog";
import styles from "./ClientKey.module.css";
import {
  checkClientAccept,
  selectAllClients,
  selectIsLoadingClient,
} from "../../../store/clientsStore";

export function ClientKey({
  clientId,
  keyValue,
  lifetime = "",
}: ClientKeyProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openGenerate, setOpenGenerate] = useState(false);

  const clientData = useSelector(selectAllClients)[clientId];
  const isLoading = useSelector(selectIsLoadingClient);
  const dispatch = useDispatch();
  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (keyValue) {
      navigator.clipboard.writeText(keyValue);
    }
    setCopied(true);
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setCopied(false);
      setAnchorEl(null);
    }, 1000);
  };

  const handleGenerate = () => {
    setOpenGenerate(true);
  };

  if (keyValue) {
    return (
      <Grid
        container
        spacing={0.5}
        direction="row"
        wrap="nowrap"
        justifyContent="space-between"
        className={styles.container}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              {!clientData.isAccept ? (
                <Chip label="Просрочен" color="error" variant="filled" />
              ) : (
                <Chip label={keyValue} color="secondary" variant="filled" />
                // <Typography variant="h5">{keyValue}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="caption">
                до {moment(lifetime, moment.ISO_8601).format("DD MMMM YYYY")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <KeygenDialog
        clientId={clientId}
        toggle={openGenerate}
        handleClose={setOpenGenerate}
      />
      <Chip label="Отсутствует" color="info" variant="filled" />
    </>
  );
}
