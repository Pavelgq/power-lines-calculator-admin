import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import DateAdapter from "@mui/lab/AdapterMoment";
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ru } from "date-fns/locale";
import { useDispatch } from "react-redux";
import { createAcceptKey } from "../../../store/acceptStore";
import useLocalStorage from "../../../hooks/useLocalStorage";

interface KeygenDialogProps {
  clientId: number;
  toggle: boolean;
  handleClose: (b: boolean) => void;
}

export function KeygenDialog({
  clientId,
  toggle,
  handleClose,
}: KeygenDialogProps) {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
  };

  const generateAcceptKey = () => {
    const newDate = {
      validDate: dateValue,
    };
    dispatch(createAcceptKey({ token, clientId, data: newDate }));
    handleClose(false);
  };

  return (
    <Dialog
      open={toggle}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Создание нового ключа для USER
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" marginBottom={2}>
          Выставьте дату и нажмите кнопку для генерации
        </DialogContentText>

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
          <DesktopDatePicker
            label="Окончание действия ключа"
            minDate={new Date(Date.now())}
            mask="__.__.____"
            value={dateValue}
            onChange={handleChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Отмена</Button>
        <Button onClick={() => generateAcceptKey()}>Сгенерировать</Button>
      </DialogActions>
    </Dialog>
  );
}
