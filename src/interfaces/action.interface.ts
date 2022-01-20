export enum Categories {
  "calculation" = "Расчет",
  "save" = "Сохранение",
  "load" = "Загрузка",
}

export enum ProgramType {
  "Экран" = 1,
  "Труба", 
  "Кабель"
}

export enum SheldMainParams {
  "param1" = "Напряжение кабеля",
  "param2" = "Длина линии"
}

export enum PipeMainParams {
  "param1" = "Класс напряжения кабеля",
  "param2" = "Длина линии"
}

export enum CableMainParams {
  "param1" = "Диаметр кабеля",
  "param2" = "Число кабелей в одной трубе"

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
  program_type: ProgramType;
  params?: string;
}
