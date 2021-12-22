import { AdminLoginInterface } from "../interfaces/admin.interface"
import { apiInstance } from "./instance"

export class Admin  {
  login ({ login, password }: AdminLoginInterface, token: string) {
    const api = apiInstance({ token });

    return api.post('/admin/login', { login, password });
  };

  getAdmin ( id: number, token: string ) {
    const api = apiInstance({ token });

    return api.get(`/admin/${id}`);
  };

}
