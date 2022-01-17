import { CircularProgress, Grid } from "@mui/material";

export function Loading() {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
