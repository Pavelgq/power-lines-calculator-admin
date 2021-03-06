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
  Grid,
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

import styles from "./ClientCard.module.css";

export function ClientCard({
  client,
  color = "white",
}: ClientCardProps): JSX.Element {
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardContent>
        <Grid container>
          <Grid container item justifyContent="space-between">
            <Grid item style={{ height: 100 }}>
              <Typography variant="h5" component="h3">
                {client.first_name} {client.last_name}
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {client.office_position}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {client.company}
              </Typography>
            </Grid>
            <Grid item>
              <ClientRowMenu id={client.id} />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <Grid item>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
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
                        {client.phone_number}
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
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <ClientKey
                  clientId={Number(client.id)}
                  keyValue={client.client_key}
                  lifetime={client.valid_until}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
