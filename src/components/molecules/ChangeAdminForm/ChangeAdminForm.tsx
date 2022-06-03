/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Box, Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string, number } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AdminChangeDataInterface } from "../../../interfaces/admin.interface";
import {
  changeAdminFetch,
  createAdminFetch,
  selectCurrentAdmin,
} from "../../../store/adminStore";
import useLocalStorage from "../../../hooks/useLocalStorage";

interface ChangeAdminFormProps {
  action: "change" | "create";
}

export function ChangeAdminForm({ action }: ChangeAdminFormProps): JSX.Element {
  const schema = object().shape({
    login: string().required("Логин должен быть указан"),
    password: string().required("Пароль должен быть указан"),
    repeatPassword: string().required("Повторите пароль"),
  });
  const admin = useSelector(selectCurrentAdmin);
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

    dispatch(
      action === "change"
        ? changeAdminFetch({ adminData, token })
        : createAdminFetch({ token, adminData })
    );
  };
  const handleAction = () => {
    handleSubmit(onSubmit);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <Grid item justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            margin="dense"
            id="login"
            error={!!errors.login}
            label="Логин"
            helperText={errors.login ? errors.login.message : ""}
            type="text"
            variant="outlined"
            {...register("login")}
          />
        </Grid>
        <Grid item>
          <TextField
            margin="dense"
            id="password"
            error={!!errors.password}
            label="Новый пароль"
            helperText={errors.password ? errors.password.message : ""}
            type="password"
            variant="outlined"
            {...register("password")}
          />
        </Grid>
        <Grid item>
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
            {...register("repeatPassword")}
          />
        </Grid>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
}
