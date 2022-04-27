import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface AlarmDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AlarmDialog({ open, setOpen }: AlarmDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Отказано в доступе</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            У вас нет доступа для использования данных функций
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
