import { CircularProgress, Grid } from "@mui/material";

export function Loading() {
  return (
    <Grid container justifyContent="center" margin={2}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
