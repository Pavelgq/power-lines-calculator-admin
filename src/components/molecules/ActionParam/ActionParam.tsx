import { Grid } from "@mui/material";
import {
  CableMainParams,
  ProgramType,
  SheldMainParams,
} from "../../../interfaces/action.interface";

export interface ActionParamInterface {
  params: string | undefined;
  type: ProgramType;
}

export function ActionParam({
  params,
  type,
}: ActionParamInterface): JSX.Element {
  console.log("llo", SheldMainParams.param1);
  const parseParams = () => {
    if (params && params.length <= 1) {
      return <div> </div>;
    }
    // const json = JSON.parse(params as string);
    const result = {};

    // switch (type) {
    //   case "1":
    //     result[SheldMainParams["param1"]] = json.param;
    //     result[SheldMainParams["param2"]] = json.param;
    //     break;
    //   case "2":
    //     result[PipeMainParams["param1"]] = json.param;
    //     result[PipeMainParams["param2"]] = json.param;
    //     break;
    //   case "3":
    //     result[CableMainParams["param1"]] = json.param;
    //     result[CableMainParams["param2"]] = json.param;
    //     break;
    //   default:
    //     break;
    // }
    return {};
  };
  parseParams();

  return (
    <Grid container>
      {/* <Grid item>{parseParams()}</Grid> */}
      <Grid item>parseParams()</Grid>
    </Grid>
  );
}
