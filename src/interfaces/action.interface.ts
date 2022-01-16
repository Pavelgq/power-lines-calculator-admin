export enum Categories {
  "calculation" = "Расчет",
  "save" = "Сохранение",
  "load" = "Загрузка",
}

export interface ActionCreateInterface {
  project_name: string;
  client_id: number;
  type: "calculation" | "save" | "load";
  data?: object;
}

export interface ActionFullInterface {
  id: number;
  client_id: number;
  project_name: string;
  type: "calculation" | "save" | "load";
  date: Date;
  path_to_data: string;
  accept_key?: string;
}
