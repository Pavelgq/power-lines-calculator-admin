import React from "react";
import { ActionFullInterface } from "../../../interfaces/action.interface";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { SortI } from "../ActionList/ActionList";

export interface ActionTableInterface {
  clientId?: number;
  data: ActionFullInterface[] | null;
  limit: number;
  page: number;
  total: number;
  programType: string;
  sort: {
    field: string;
    dir: "asc" | "desc";
  };
  handleChangePage: (event: unknown, page: number) => void;
  handleChangeLimit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: React.Dispatch<React.SetStateAction<SortI>>;
  // collapsible?: ReactElement<any, any>;
}
