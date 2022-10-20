import { AcceptDateInterface } from "../interfaces/accept.interface";
import { apiInstance } from "./instance";

export class Accept {
  checkAcceptKey(key: string) {
    const api = apiInstance({});
    return api.get(`/accept/check/${key}`);
  }

  createAcceptKey(token: string, clientId: string, data: AcceptDateInterface) {
    const api = apiInstance({ token });
    return api.post(`/accept/${clientId}`, data);
  }

  getAcceptKey(token: string, clientId: number) {
    const api = apiInstance({ token });
    return api.get(`/accept/${clientId}`);
  }

  changeAcceptKey(token: string, clientId: number, data: AcceptDateInterface) {
    const api = apiInstance({ token });
    return api.put(`/accept/${clientId}`, data);
  }

  deleteAcceptKey(token: string, clientId: number) {
    const api = apiInstance({ token });
    return api.delete(`/accept/${clientId}`);
  }

  sendAcceptKey(token: string, key: string, email: string) {
    const api = apiInstance({token});
    return api.post(`/accept/send`, {key, email})
  }
}
