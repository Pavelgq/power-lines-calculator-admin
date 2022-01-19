import { Button, Chip, Grid, Link, Popover, Typography } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "../../../helpers/date";
import { ClientKeyProps } from "./ClientKey.props";
import { KeygenDialog } from "../KeygenDialog/KeygenDialog";
import styles from "./ClientKey.module.css";

export function ClientKey({
  clientId,
  keyValue,
  lifetime = "",
}: ClientKeyProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openGenerate, setOpenGenerate] = useState(false);

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
        <Grid item xs={9}>
          <Typography variant="h5">{keyValue}</Typography>
          <Typography variant="caption">
            {moment(lifetime, moment.ISO_8601).format("DD MMMM YYYY")}
            {Date.parse(lifetime) - Date.now() < -24 * 60 * 60 * 1000 ? (
              <Chip label="Просрочен" color="error" variant="filled" />
            ) : (
              ""
            )}
          </Typography>
          <Button
            onClick={handleCopy}
            size="small"
            sx={{ minWidth: "40px", padding: "5px" }}
          >
            <ContentCopyIcon fontSize="small" />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Popover
            open={copied}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography variant="body2" margin={1}>
              Скопировано
            </Typography>
          </Popover>
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
      <Button type="submit" variant="contained" onClick={handleGenerate}>
        Генерировать
      </Button>
    </>
  );
}
