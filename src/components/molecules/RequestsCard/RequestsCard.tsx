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
import { RequestsCardProps } from "./RequestsCard.props";
import { ClientKey } from "../ClientKey/ClientKey";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { deleteClientFetch } from "../../../store/clientsStore";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { formatePhone } from "../../../helpers/format";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";

import styles from "./ClientCard.module.css";
import { RequestRowMenu } from "../RequestRowMenu/RequestRowMenu";

export function RequestsCard({
  client,
  color = "white",
}: RequestsCardProps): JSX.Element {
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardContent>
        <Grid container alignContent="flex-end" alignItems="flex-end">
          <Grid container item justifyContent="space-between" wrap="nowrap">
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
          </Grid>
          <Grid container item>
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
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <RequestRowMenu id={client.id} />
      </CardActions>
    </Card>
  );
}
