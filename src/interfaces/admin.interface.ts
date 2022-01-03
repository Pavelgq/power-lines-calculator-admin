export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface AdminDataInterface {
  login: string;
  password?: string;
  status: ROLES;
  message?: string;
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
