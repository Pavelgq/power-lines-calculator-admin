import { ActionFullInterface } from "../../../interfaces/action.interface";
import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ActionTableInterface {
  data: ActionFullInterface[] | null;
  limit: number;
  page: number;
  handleChangePage: (event: unknown, page: number) => void;
  handleChangeLimit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}