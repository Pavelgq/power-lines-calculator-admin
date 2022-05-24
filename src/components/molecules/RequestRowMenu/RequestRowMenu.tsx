import { Button, Container, Grid } from "@mui/material";
import { RequestRowMenuProps } from "./RequestRowMenu.props";

export function RequestRowMenu({ id }: RequestRowMenuProps) {
  return (
    <Grid container direction="row">
      <Grid item>
        <Button color="success">Принять</Button>
      </Grid>
      <Grid item>
        <Button color="error">Отклонить</Button>
      </Grid>
    </Grid>
  );
}
