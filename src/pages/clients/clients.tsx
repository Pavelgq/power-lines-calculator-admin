import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import { RootState } from '../../store/store'

import { createClientsFetch, getClientsFetch } from '../../store/clientsStore';
import useLocalStorage from '../../hooks/useLocalStorage';

import { ClientCard } from '../../components';
import { ClientForm } from '../../components/molecules/ClientForm/ClientForm';


export function Clients(): JSX.Element {
  const {clientId} = useParams();

  console.log(clientId )

  const [token] = useLocalStorage('token');
  const clients = useSelector((state: RootState) => state.clients.data);
  const isLoading = useSelector((state: RootState) => state.clients.isLoading);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getClientsFetch({token}));
    return () => {

    }
  }, [dispatch])


  if (isLoading) {
    return (
      <span>Загрузка данных...</span>
    )
  }

  if (!Object.keys(clients).length) {
    return (
      <div>
        Клиентов пока нету
      </div>
    )
  }

  if (clientId) {
    return <Outlet /> 
  }

  return (
      <>
        <Button type='submit' variant="contained" onClick={handleClickOpen}>Добавить клиента</Button>
        <ClientForm title='Добавить' open={open} setOpen={setOpen}/>
        <Grid
          container
          spacing={2}
        >
          { Object.keys(clients).map((client) => (
            <Grid item key={clients[client].id}>
              <ClientCard client={clients[client]} />
            </Grid>
          )) }
        </Grid>
      </>
      )
}