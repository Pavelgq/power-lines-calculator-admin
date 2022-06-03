import { Button, Container, Grid } from "@mui/material";
import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  acceptRequestFetch,
  selectAllClients,
  rejectRequestFetch,
  deleteClientFetch,
} from "../../../store/clientsStore";
import { RequestRowMenuProps } from "./RequestRowMenu.props";


export function RequestRowMenu({ id }: RequestRowMenuProps) {
  const dispatch = useDispatch();
  const client = useSelector(selectAllClients)[id];

  const [token] = useLocalStorage("token");

  const handleAccept = (e: MouseEvent) => {
    dispatch(
      acceptRequestFetch({
        clientId: id,
        clientData: { ...client, request: false },
        token,
      })
    );
  };

  const handleReject = (e: MouseEvent) => {
    dispatch(deleteClientFetch({ token, id }));
  };

  return (
    <Grid container direction="row" wrap="nowrap" gap={1}>
      <Grid item>
        <Button variant="contained" color="success" onClick={handleAccept}>
          <AddIcon/>
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="error" onClick={handleReject}>
          <BlockIcon/>
        </Button>
      </Grid>
    </Grid>
  );
}
