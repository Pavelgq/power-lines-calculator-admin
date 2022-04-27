import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { boolean } from "yup/lib/locale";

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleChange: () => void;
}

export function AlertDialog({
  open,
  handleClose,
  handleChange,
}: AlertDialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Вы уверены?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Удаление приведет к безвозвратной потере данных.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleChange} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
}
