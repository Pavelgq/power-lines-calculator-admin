import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";

interface KeygenDialogProps {
  toggle: boolean;
  handleClose: (b: boolean) => void;
}

export function KeygenDialog({toggle, handleClose}: KeygenDialogProps) {
  const [dateValue, setDateValue] = useState<Date | null>(new Date);

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
    handleClose(false);
  }
  console.log(toggle, dateValue)
  return (
    <Dialog
        open={toggle}
        onClose={() => handleClose(false)}
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
          <LocalizationProvider dateAdapter={DateAdapter}>
           <DesktopDatePicker
              label="Окончание действия ключа"
              inputFormat="mm.d.yyyy"
              value={dateValue}
              onChange={handleChange}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Отмена</Button>
          <Button onClick={() => handleChange(dateValue)} >
            Сгенерировать
          </Button>
        </DialogActions>
      </Dialog>
  )
}