export enum Categories {
  'calculation' = 'Расчет',
  'save' = 'Сохранение',
  'load' = 'Загрузка'
}

export interface ActionCreateInterface {
  name: string;
  client_id: number;
  type: 'calculation' | 'save' | 'load';
  data: string;
}

export interface ActionFullInterface {
  id: number;
  client_id: number;
  type: "calculation" | "save" | "load";
  date: Date;
  path_to_data: string;
  acceptKey?: string;
}
