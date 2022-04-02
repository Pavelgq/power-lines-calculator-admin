export enum Categories {
  "calculation" = "Расчет",
  "save" = "Сохранение",
  "load" = "Загрузка",
}

export enum ProgramType {
  "Труба" = 1,
  "Экран",
  "Кабель",
}

export interface ActionCreateInterface {
  project_name: string;
  client_id: number;
  type: "calculation" | "save" | "load";
  data?: object;
  program_type?: number;
  params?: object;
}

export interface ActionSemiFullInterface {
  id: number;
  client_id: number;
  project_name: string;
  type: "calculation" | "save" | "load";
  date: Date;
  path_to_data: string;
  accept_key?: string;
  program_type: ProgramType;
  params?: string;
}

export interface ActionFullInterface {
  id: number;
  client_id: number;
  project_name: string;
  type: "calculation" | "save" | "load";
  date: Date;
  path_to_data: string;
  accept_key?: string;
  program_type: ProgramType;
  params?: string;
  group?: ActionSemiFullInterface[];
}
