import { Link, Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions, Button } from "@mui/material"

import ContactIcon from '@mui/icons-material/PermContactCalendar';
import { ClientCardProps } from "./ClientCard.props";
import { ClientKey } from '../../index';

export function ClientCard({client, color='white'}: ClientCardProps): JSX.Element {

  return (
    <Card>
      <CardContent>
        <Link href={`/${client.id}`}>
          <Typography  variant="h5" component="h3">
            {client.first_name} {client.last_name}
          </Typography>
        </Link>
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
        <ClientKey keyValue={client.key} />
      </CardContent>
      <CardActions>
        <Button size="small">Изменить</Button>
        <Button size="small" color="warning">Удалить</Button>
      </CardActions>
    </Card>
  )
}