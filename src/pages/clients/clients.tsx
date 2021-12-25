import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'

import useFetch from '../../hooks/useFetch';
import { createClientsFetch, getClientsFetch } from '../../store/clientsStore';
import styles from './authentication.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Avatar, Button, Card, CardActions, CardContent, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import ContactIcon from '@mui/icons-material/PermContactCalendar';
import { ClientKey } from '../../components';


export const Clients = (): JSX.Element => {
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
      <Grid
        container
        spacing={2}
      >
        {clients.map((client) => (
          <Grid item key={client.id}>
            <Card>
              <CardContent>
                <Typography  variant="h5" component="h3">
                  {client.first_name} {client.last_name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {client.office_position}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Компания "{client.company}"
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {/* <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={client.office_position} secondary={`Компания "${client.company}"`} />
                  </ListItem> */}
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ContactIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Link href={`tel:${client.phone_number}`}>{client.phone_number}</Link>} secondary={<Link href={`mailto:${client.email}`}>{client.email}</Link>} />
                    
                  </ListItem>
                </List>
                <Typography variant='body2'>
                  Ключ: 
                </Typography>
                <ClientKey keyValue={'123123'} />
              </CardContent>
              <CardActions>
                <Button size="small">Изменить</Button>
                <Button size="small">Удалить</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
    </>
  )
}