import { ActionFullInterface } from "../../../interfaces/action.interface";
import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ActionTableInterface {
  clientId?: number;
  data: ActionFullInterface[] | null;
  limit: number;
  page: number;
  total: number;
  handleChangePage: (event: unknown, page: number) => void;
  handleChangeLimit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}