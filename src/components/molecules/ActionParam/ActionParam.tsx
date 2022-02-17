import { Grid, Typography } from "@mui/material";
import { ProgramType } from "../../../interfaces/action.interface";

export interface ActionParamInterface {
  params: string | undefined;
  type: ProgramType;
}

export const sheldMainParams = {
  param1: "Напряжение кабеля",
  param2: "Длина линии",
};

export const pipeMainParams = {
  param1: "Класс напряжения кабеля",
  param2: "Длина линии",
};

export const cableMainParams = {
  param1: "Диаметр кабеля",
  param2: "Число кабелей в одной трубе",
};

export function ActionParam({
  params,
  type,
}: ActionParamInterface): JSX.Element {
  const parseParams = () => {
    console.log(params);
    if (!params || (params && params.length <= 1)) {
      return <div> </div>;
    }
    const json = JSON.parse(params as string);
    const result = [sheldMainParams, pipeMainParams, cableMainParams];

    return (
      <>
        <Grid item>
          <Typography variant="body1">
            {result[type - 1].param1}: {json.param1}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
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