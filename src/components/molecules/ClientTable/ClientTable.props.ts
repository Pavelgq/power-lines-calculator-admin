import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ClientTableInterface {
  selectClient: number;
  setSelectClient: React.Dispatch<React.SetStateAction<number>>;
}