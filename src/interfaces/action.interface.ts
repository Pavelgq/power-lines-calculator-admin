export interface actionCreateInterface {
  client_id: number;
  type: 'calculation' | 'save' | 'load';
  data: JSON;
}

export interface actionFullInterface {
    client_id: number
    type: 'calculation' | 'save' | 'load';
    date: Date;
    path_of_data: string;
  }
