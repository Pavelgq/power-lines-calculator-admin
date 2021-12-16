export interface AdminDataInterface {
  login: string;
  password?: string;
  status: 'admin' | 'guest';
}

export interface AdminAnswerInterface {
  token?: string;
  key?: string;
  message: string;
}

export interface AdminLoginInterface {
  login: string;
  password: string;
}

export interface AdminFullInterface {
  id: number;
  status: 'admin' | 'guest';
  login: string;
  token: string;
}