import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ClientCardProps {
  client: ClientDataInterface;
  color?: "white" | "dark";
  searchValue?: string;
}
