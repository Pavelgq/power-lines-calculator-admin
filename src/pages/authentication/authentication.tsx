import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import useLocalStorage from "../../hooks/useLocalStorage";
import {
  loginAdmin,
  selectIsAuthenticated,
  selectIsError,
} from "../../store/adminStore";
import styles from "./Authentication.module.css";
import { CustomSnackbar } from "../../components/molecules/CustomSnackbar/CustomSnackbar";

export function Authentication(): JSX.Element {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useLocalStorage("token");

  const auth = useSelector(selectIsAuthenticated);
  const error = useSelector(selectIsError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(loginAdmin({ login, password }));
  };

  useEffect(() => {
    let delay: NodeJS.Timeout;
    if (auth) {
      delay = setTimeout(() => {
        navigate({ pathname: "/clients" });
      }, 1000);
    }

    return () => {
      clearTimeout(delay);
    };
  }, [auth]);

  // if (auth) {
  //   return (
  //     <Container>
  //       <Alert severity="success">Авторизация успешна!</Alert>
  //     </Container>
  //   );
  // }

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {auth && (
        <CustomSnackbar
          trigger={auth}
          message="Авторизация успешна!"
          variant="success"
        />
      )}
      {error && (
        <CustomSnackbar
          trigger={error && true}
          message={error}
          variant="error"
        />
      )}
      <Grid item>
        <Typography variant="h5" component="h2">
          Авторизация
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} md={8}>
              <TextField
                label="Логин"
                variant="outlined"
                autoFocus
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Пароль"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item justifyContent="flex-end">
              <Button type="submit" variant="outlined">
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
