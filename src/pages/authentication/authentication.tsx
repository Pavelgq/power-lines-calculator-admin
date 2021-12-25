
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Grid, Input, TextField, Typography } from '@mui/material';

import useLocalStorage from '../../hooks/useLocalStorage';
import { createAdminFetch, loginAdmin } from '../../store/adminStore';
import { RootState } from '../../store/store';
import styles from './authentication.module.css';

export const Authentication = (): JSX.Element => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccesSubmit, setIsSuccesSubmit] = useState(false);
  // const {post, response, isLoading, error} = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage('token');

  const auth = useSelector((state: RootState) => state.admin.auth)
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
        event.preventDefault()
        dispatch(loginAdmin({ login, password}));
        
    }

    useEffect(() => {
      if (auth) {
        navigate({pathname: '/clients'})
      }
    }, [auth])

    if (auth) {
        return <Navigate
          to={`/clients`}
          replace
        />
    }

  return (
    <Grid  
      container
      spacing={2}
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5" component="h2">
          Авторизация
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
        <Grid 
          container 
          spacing = {2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6} md={8}>
            <TextField  
              label="Логин" 
              variant="outlined" 
              autoFocus
              type='text'
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </Grid>
           <Grid item>
              <TextField  
                label="Пароль" 
                variant="outlined" 
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              /> 
           </Grid>
          
            <Grid item justifyContent="flex-end">
                <Button type='submit' variant="outlined">Войти</Button>
            </Grid>
          
        </Grid>
       
      </form>
      </Grid>
      
      
    </Grid>
  )
}