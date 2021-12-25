
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Grid, Input, TextField, Typography } from '@mui/material';

import useLocalStorage from '../../hooks/useLocalStorage';
import { createAdminFetch, loginAdmin } from '../../store/adminStore';
import { RootState } from '../../store/store';
import styles from './authentication.module.css';

export const Authentication = (): JSX.Element => {
  // const apiUrl = '/admin/login';

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
        dispatch(loginAdmin({ login, password, token}));
        
    }

    useEffect(() => {
      if (auth) {
        navigate({pathname: '/clients'})
      }
    }, [auth])

    // if (state.auth) {
    //     return <Navigate
    //       to={`/clients`}
    //       replace
    //     />
    // }

  return (
    <Grid  
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5" component="h2">
        Авторизация
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid 
          container 

          direction="column"
          justifyContent="center"
          alignItems="center"
        >
           <TextField  
            label="Логин" 
            variant="outlined" 
            autoFocus
            type='text'
            value={login}
            onChange={e => setLogin(e.target.value)}
            />
          <TextField  
            label="Пароль" 
            variant="outlined" 
            autoFocus
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            /> 
            <Grid>
              <Button type='submit' variant="outlined">Войти</Button>
            </Grid>
          
        </Grid>
       
      </form>
    </Grid>
  )
}