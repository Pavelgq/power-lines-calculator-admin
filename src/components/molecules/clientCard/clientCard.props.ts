import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ClientCardProps {
  client: ClientDataInterface;
  // view: 'open' | 'close';
  color?: "white" | "dark";
}
