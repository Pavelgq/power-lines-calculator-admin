import { AdminLoginInterface } from "../interfaces/admin.interface"
import { apiInstance } from "./instance"

export class Admin  {
  login ({ login, password }: AdminLoginInterface) {
    const api = apiInstance({});

    return api.post('/admin/login', { login, password });
  };

  profile (token: string) {
    const api = apiInstance({ token });

    return api.post('/admin/profile');
  };

  getAdmin ( id: number, token: string ) {
    const api = apiInstance({ token });

    return api.get(`/admin/${id}`);
  };

}
