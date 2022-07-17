import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface RequestsCardProps {
  client: ClientDataInterface;
  // view: 'open' | 'close';
  color?: "white" | "dark";
}
