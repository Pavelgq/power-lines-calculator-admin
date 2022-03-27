import { Grid, Typography } from "@mui/material";
import { ProgramType } from "../../../interfaces/action.interface";

export interface ActionParamInterface {
  params: string | undefined;
  type: ProgramType;
}

export const sheldMainParams = {
  param1: "Напряжение",
  param2: "Длина линии",
};

export const cableMainParams = {
  param1: "Напряжение",
  param2: "Длина линии",
};

export const pipeMainParams = {
  param1: "Диаметр кабеля",
  param2: "Число кабелей в трубе",
};

export function ActionParam({
  params,
  type,
}: ActionParamInterface): JSX.Element {
  const parseParams = () => {
    if (!params || (params && params.length <= 1)) {
      return <div> </div>;
    }
    const json = JSON.parse(params as string);
    const result = [pipeMainParams, sheldMainParams, cableMainParams];

    return (
      <>
        <Grid item>
          <Typography variant="body2">
            {result[type - 1].param1}: {json.param1}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {result[type - 1].param2}: {json.param2}
          </Typography>
        </Grid>
      </>
    );
  };

  return (
    <Grid container direction="column">
      {parseParams()}
    </Grid>
  );
}
