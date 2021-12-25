import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { RootState } from '../../store/store'

import { createClientsFetch, getClientsFetch } from '../../store/clientsStore';
import useLocalStorage from '../../hooks/useLocalStorage';

import { ClientCard } from '../../components';


export function Clients(): JSX.Element {
  const [token] = useLocalStorage('token');
  const clients = useSelector((state: RootState) => state.clients.data);
  const dispatch = useDispatch();

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

  if (!clients.length) {
    return (
      <div>
        Клиентов пока нету
      </div>
    )
  }

  return (
    <>
      <Button type='submit' variant="contained">Добавить клиента</Button>

      <Grid
        container
        spacing={2}
      >
        {clients.map((client) => (
          <Grid item key={client.id}>
            <ClientCard client={client} />
          </Grid>
        ))}
      </Grid>
      
    </>
  )
}