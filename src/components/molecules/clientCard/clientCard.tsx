import { Link as MuiLink, Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, CardActions, Button } from "@mui/material"
import { Link } from "react-router-dom";
import ContactIcon from '@mui/icons-material/PermContactCalendar';
import { ClientCardProps } from "./ClientCard.props";
import { ClientKey } from '../ClientKey/ClientKey';


export function ClientCard({client, color='white'}: ClientCardProps): JSX.Element {

  return (
    <Card>
      <CardContent>
        <Link to={`/${client.id}`}>
          <Typography  variant="h5" component="h3">
            {client.first_name} {client.last_name}
          </Typography>
        </Link>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {client.office_position}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Компания &quot;{client.company}&quot;
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ContactIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<MuiLink href={`tel:${client.phone_number}`}>{client.phone_number}</MuiLink>} secondary={<MuiLink href={`mailto:${client.email}`}>{client.email}</MuiLink>} />
            
          </ListItem>
        </List>
        <Typography variant='body2'>
          Ключ: <ClientKey keyValue={client.key} />
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Изменить</Button>
        <Button size="small" color="warning">Удалить</Button>
      </CardActions>
    </Card>
  )
}