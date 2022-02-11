import {
  Link as MuiLink,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ContactIcon from "@mui/icons-material/PermContactCalendar";
import { useState } from "react";
import { ClientCardProps } from "./ClientCard.props";
import { ClientKey } from "../ClientKey/ClientKey";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { deleteClientFetch } from "../../../store/clientsStore";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { formatePhone } from "../../../helpers/format";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";

export function ClientCard({
  client,
  color = "white",
}: ClientCardProps): JSX.Element {
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  return (
    <Card>
      <CardContent>
        <Link to={`/clients/${client.id}`}>
          <Typography variant="h5" component="h3">
            {client.first_name} {client.last_name}
          </Typography>
        </Link>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {client.office_position}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Компания &quot;{client.company}&quot;
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ContactIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <MuiLink href={`tel:${client.phone_number}`}>
                  {formatePhone(client.phone_number)}
                </MuiLink>
              }
              secondary={
                <MuiLink href={`mailto:${client.email}`}>
                  {client.email}
                </MuiLink>
              }
            />
          </ListItem>
        </List>
        <Typography variant="body2">
          Ключ:{" "}
          {/* <ClientKey
            clientId={Number(client)}
            keyValue={client.client_key}
            lifetime={client.valid_until}
          /> */}
        </Typography>
      </CardContent>
      <ClientRowMenu id={client.id} />
    </Card>
  );
}
