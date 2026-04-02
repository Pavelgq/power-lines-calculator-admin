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
  Box,
  Stack,
} from "@mui/material";
import ContactIcon from "@mui/icons-material/PermContactCalendar";
import { ClientCardProps } from "./ClientCard.props";
import { ClientKey } from "../ClientKey/ClientKey";
import { SearchMatchText } from "../../atoms/SearchMatchText/SearchMatchText";
import { ClientRowMenu } from "../ClientRowMenu/ClientRowMenu";

export function ClientCard({
  client,
  searchValue = "",
}: ClientCardProps): JSX.Element {
  return (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: 2,
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                }}
              >
                <SearchMatchText
                  text={`${client.first_name ?? ""} ${client.last_name ?? ""}`.trim()}
                  query={searchValue}
                />
              </Typography>
              {client.office_position ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, wordBreak: "break-word" }}
                >
                  {client.office_position}
                </Typography>
              ) : null}
              {client.company ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, wordBreak: "break-word" }}
                >
                  <SearchMatchText
                    text={client.company}
                    query={searchValue}
                  />
                </Typography>
              ) : null}
            </Box>
            <Box sx={{ flexShrink: 0, ml: 0.5 }}>
              <ClientRowMenu id={client.id} />
            </Box>
          </Stack>

          <List
            disablePadding
            sx={{
              width: "100%",
              bgcolor: "action.hover",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
              <ListItemAvatar sx={{ minWidth: 48 }}>
                <Avatar sx={{ width: 36, height: 36 }}>
                  <ContactIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: "body2", component: "div" }}
                secondaryTypographyProps={{ variant: "body2", component: "div" }}
                primary={
                  <MuiLink href={`tel:${client.phone_number}`} underline="hover">
                    {client.phone_number}
                  </MuiLink>
                }
                secondary={
                  <MuiLink href={`mailto:${client.email}`} underline="hover">
                    {client.email}
                  </MuiLink>
                }
              />
            </ListItem>
          </List>

          <Box sx={{ width: "100%" }}>
            <Typography variant="body2" component="div">
              <ClientKey
                clientId={Number(client.id)}
                keyValue={client.client_key}
                lifetime={client.valid_until}
              />
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
