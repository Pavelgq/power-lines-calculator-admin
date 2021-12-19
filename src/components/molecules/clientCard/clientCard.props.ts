import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface ClientCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  client: ClientDataInterface
  // view: 'open' | 'close';
  color?: 'white' | 'dark';
  children: ReactNode;
}