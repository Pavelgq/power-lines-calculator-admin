export interface ClientColumnI {
  field: string;
  headerName: string;
  width: number;
  numeric?: boolean;
  sorting?: boolean;
  search?: boolean;
}


export interface ClientDataInterface {
  ordinal?: number;
  first_name: string;
  last_name: string;
  company: string;
  office_position: string;
  phone_number: string;
  email: string;
  id: number;
  client_key?: string;
  update?: string;
  valid_until?: string;
  isAccept?: boolean;
  request?: boolean;
  creation_date: string;
  admin_flag?: boolean;
}

