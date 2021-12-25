export interface ActionCreateInterface {
  client_id: number;
  type: "calculation" | "save" | "load";
  data: JSON;
}

export interface ActionFullInterface {
  client_id: number;
  type: "calculation" | "save" | "load";
  date: Date;
  path_of_data: string;
}
