import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ClientTableInterface {
  data: {[id: string]: ClientDataInterface},
}