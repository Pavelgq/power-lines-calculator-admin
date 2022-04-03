export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface AdminDataInterface {
  id: string;
  login: string;
  password?: string;
  status: ROLES;
  message?: string;
}

export interface AdminChangeDataInterface {
  login: string;
  password: string;
  repeatPassword?: string;
  status: ROLES;
}


export interface AdminLoginInterface {
  login: string;
  password: string;
}

export interface AdminFullInterface {
  id: number;
  status?: ROLES;
  login: string;
  token: string;
}
