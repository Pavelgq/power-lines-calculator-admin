import { AlertColor } from "@mui/lab";

export interface CustomSnackbarProps {
  message: string | Error;
  trigger: boolean;
  variant?: AlertColor | undefined;
}
