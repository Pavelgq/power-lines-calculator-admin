import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { boolean } from "yup/lib/locale";

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export function AlertDialog({open, handleClose, handleDelete}: AlertDialogProps): JSX.Element {

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Вы уверены, что хотите удалить пользователя?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Удаление приведет к безвозвратной потере данных.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleDelete} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
  )
}