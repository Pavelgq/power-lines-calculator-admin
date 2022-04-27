/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AdminChangeDataInterface } from "../../../interfaces/admin.interface";
import {
  changeAdminFetch,
  createAdminFetch,
  selectAdmins,
  selectCurrentAdmin,
} from "../../../store/adminStore";
import useLocalStorage from "../../../hooks/useLocalStorage";

interface EditAdminFormProps {
  action: "change" | "create";
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
}

export function EditAdminForm({
  action,
  open,
  setOpen,
  id = 0,
}: EditAdminFormProps): JSX.Element {
  const schema = object().shape({
    login: string().required("Логин должен быть указан"),
    password: string().required("Пароль должен быть указан"),
    repeatPassword: string().required("Повторите пароль"),
  });
  const admin =
    action === "create"
      ? useSelector(selectCurrentAdmin)
      : useSelector(selectAdmins)[id];
  const {
    control,
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdminChangeDataInterface>({
    resolver: yupResolver(schema),
    defaultValues: action === "change" ? { ...admin } : {},
  });
  const [token] = useLocalStorage("token");

  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<AdminChangeDataInterface> = (adminData) => {
    console.log(adminData);

    dispatch(
      action === "change"
        ? changeAdminFetch({ adminData, id, token })
        : createAdminFetch({ token, adminData })
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    handleSubmit(onSubmit);
    if (Object.keys(errors).length === 0) {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Изменить данные клиента</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Измените данные в полях формы и нажмите сохранить
          </DialogContentText>

          <TextField
            margin="dense"
            id="login"
            error={!!errors.login}
            label="Логин"
            helperText={errors.login ? errors.login.message : ""}
            type="text"
            variant="outlined"
            fullWidth
            {...register("login")}
          />
          <TextField
            margin="dense"
            id="password"
            error={!!errors.password}
            label="Новый пароль"
            helperText={errors.password ? errors.password.message : ""}
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
          />

          <TextField
            margin="dense"
            id="repeatPassword"
            error={!!errors.repeatPassword}
            label="Повторите пароль"
            helperText={
              errors.repeatPassword ? errors.repeatPassword.message : ""
            }
            type="password"
            variant="outlined"
            fullWidth
            {...register("repeatPassword")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="button" onClick={() => reset()}>
            Очистить
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleAction}
          >
            Cохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
