import {
  AdminChangeDataInterface,
  AdminLoginInterface,
} from "../interfaces/admin.interface";
import { apiInstance } from "./instance";

export class Admin {
  login({ login, password }: AdminLoginInterface) {
    const api = apiInstance({});

    return api.post("/admin/login", { login, password });
  }

  profile(token: string) {
    const api = apiInstance({ token });

    return api.get("/admin/profile");
  }

  getAdmin(id: number, token: string) {
    const api = apiInstance({ token });

    return api.get(`/admin/${id}`);
  }

  getAdmins(token: string) {
    const api = apiInstance({ token });

    return api.get(`/admin/all`);
  }

  createAdmin(
    token: string,
    { login, password, status }: AdminChangeDataInterface
  ) {
    const api = apiInstance({ token });

    return api.post("/admin/create", { login, password, status });
  }

  changeAdmin(id: number, token: string, login: string, password: string) {
    const api = apiInstance({ token });

    return api.put(`/admin/${id}`, { login, password });
  }

  deleteAdmin(id: number, token: string) {
    const api = apiInstance({ token });

    return api.delete(`/admin/${id}`);
  }
}
