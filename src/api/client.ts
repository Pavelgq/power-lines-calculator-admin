import { ClientDataInterface } from "../interfaces/client.interface";
import { apiInstance } from "./instance";

export class Client {
  getAllClients = (token: string) => {
    const api = apiInstance({ token });

    return api.get("/client/all");
  };

  getOneClient = (token: string, id: number) => {
    const api = apiInstance({ token });

    return api.get(`/client/${id}`);
  };

  createClient = (token: string, clientData: ClientDataInterface) => {
    const api = apiInstance({ token });

    return api.post(`/client/create`, clientData);
  };

  updateClient = (
    token: string,
    id: number,
    clientData: ClientDataInterface
  ) => {
    const api = apiInstance({ token });

    return api.put(`/client/${id}`, clientData);
  };

  deleteClient = (token: string, id: number) => {
    const api = apiInstance({ token });

    return api.delete(`/client/${id}`);
  };
}
