import { Snackbar, Alert } from "@mui/material";
import { CustomSnackbarProps } from "./CustomSnackbar.props";

export function CustomSnackbar({
  message,
  trigger,
  variant = "success",
}: CustomSnackbarProps): JSX.Element {
  return (
    <Snackbar open={trigger} autoHideDuration={1000}>
      <Alert severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
