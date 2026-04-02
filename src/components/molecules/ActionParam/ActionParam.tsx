import { Grid, Typography } from "@mui/material";
import { ProgramType } from "../../../interfaces/action.interface";
import { ProgramParams } from "../../../domain/programParams";

export interface ActionParamInterface {
  params: string | undefined;
  type: ProgramType;
}

export {
  ProgramParams,
  pipeMainParams,
  sheldMainParams,
  cableMainParams,
} from "../../../domain/programParams";

export function ActionParam({
  params,
  type,
}: ActionParamInterface): JSX.Element {
  const parseParams = () => {
    if (!params || (params && params.length <= 1)) {
      return <div> </div>;
    }
    const json = JSON.parse(params as string);
    const defs = ProgramParams[type - 1];

    return (
      <>
        {json.param3 && (
          <Grid item>
            <Typography variant="body2">
              {defs.param3}: {json.param3}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Typography variant="body2">
            {defs.param1}: {json.param1} {defs.param1Dim}
          </Typography>
        </Grid>
        {json.param4 && (
          <Grid item>
            <Typography variant="body2">
              {defs.param4}: {json.param4}
            </Typography>
          </Grid>
        )}
        {json.param2 && (
          <Grid item>
            <Typography variant="body2">
              {defs.param2}: {json.param2} {defs?.param2Dim}
            </Typography>
          </Grid>
        )}
      </>
    );
  };

  return (
    <Grid container direction="column">
      {parseParams()}
    </Grid>
  );
}
