import { ActionCreateInterface } from "../interfaces/action.interface";
import { apiInstance } from "./instance";

export class Action {
  getAllActions = (
    token: string,
    page: number = 1,
    limit: number = 5,
    clientId: number = 0
  ) => {
    const api = apiInstance({ token });
    let path = "";
    if (clientId) {
      path = `/action/all?page=${page}&limit=${limit}&client_id=${clientId}`;
    } else {
      path = `/action/all?page=${page}&limit=${limit}`;
    }

    return api.get(path);
  };

  createActionForClient = (
    acceptToken: string,
    data: ActionCreateInterface
  ) => {
    const api = apiInstance({ acceptToken });
    console.log("createActionForClient", data);
    return api.post(`/action/add`, data);
  };

  getActionsForClient = (
    acceptToken: string,
    clientId: number,
    page: number = 1,
    limit: number = 5
  ) => {
    const api = apiInstance({ acceptToken });

    return api.get(`/action/client/${clientId}?page=${page}&limit=${limit}`);
  };

  getActionFile = (fileName: string) => {
    const api = apiInstance({});

    return api.get(`action/file/${fileName}`);
  };
}
