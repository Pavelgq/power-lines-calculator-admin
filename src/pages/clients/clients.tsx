import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { RootState } from '../../store/store'

import { createClientsFetch, getClientsFetch } from '../../store/clientsStore';
import useLocalStorage from '../../hooks/useLocalStorage';

import { ClientCard } from '../../components';
import { ClientForm } from '../../components/molecules/ClientForm/ClientForm';


export function Clients(): JSX.Element {
  const [token] = useLocalStorage('token');
  const clients = useSelector((state: RootState) => state.clients.data);
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
  console.log(clients)

  const handleSubmit = () => {
    console.log('submit')
    dispatch(createClientsFetch({
      "first_name": "Pavel1",
      "last_name": "Gord1",
      "company": "ZEU1",
      "office_position": "123421",
      "phone_number": "8999999942",
      "email": "afsdf23@dsf34a.ru"
    }))
  }

  if (!Object.keys(clients).length) {
    return (
      <div>
        Клиентов пока нету
      </div>
    )
  }

  return (
    <>
      <Button type='submit' variant="contained" onClick={handleClickOpen}>Добавить клиента</Button>
      <ClientForm title='Добавить' open={open} setOpen={setOpen}/>
      <Grid
        container
        spacing={2}
      >
        {Object.keys(clients).map((client) => (
          <Grid item key={clients[client].id}>
            <ClientCard client={clients[client]} />
          </Grid>
        ))}
      </Grid>
      
    </>
  )
}