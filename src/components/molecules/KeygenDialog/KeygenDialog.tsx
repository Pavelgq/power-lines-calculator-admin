import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useState } from "react";

interface KeygenDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function KeygenDialog({open, handleClose}: KeygenDialogProps) {
  const [dateValue, setDateValue] = useState<Date | null>(new Date);

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Здесь будет генерация ключа
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Выставьте дату и нажмите кнопку для генерации
          </DialogContentText>
          <DesktopDatePicker
            label="Окончание действия ключа"
            inputFormat="MM/dd/yyyy"
            value={dateValue}
            onChange={handleChange}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClose} autoFocus>
            Сгенерировать
          </Button>
        </DialogActions>
      </Dialog>
  )
}