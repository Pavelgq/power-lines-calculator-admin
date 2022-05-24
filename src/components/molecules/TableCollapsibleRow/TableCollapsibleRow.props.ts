import { ActionFullInterface } from "../../../interfaces/action.interface";
import { ActionColumnParamsI } from "../ActionTable/ActionTable";

export interface TableCollapsibleRowProps {
  actionData: ActionFullInterface;
  columns: ActionColumnParamsI[];
}
