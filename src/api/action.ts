import { ActionCreateInterface } from "../interfaces/action.interface";
import { apiInstance } from "./instance";

export class Action {
  getAllActions = (token: string) => {
    const api = apiInstance({ token });

    return api.get("/action/all?page=1&limit=5");
  };

  createActionForClient = (
    acceptToken: string,
    data: ActionCreateInterface
  ) => {
    const api = apiInstance({ acceptToken });

    return api.post(`/action/add`, data);
  };

  getActionsForClient = (acceptToken: string, clientId: number) => {
    const api = apiInstance({ acceptToken });

    return api.get(`/action/${clientId}`);
  };

  getActionFile = (fileName: string) => {
    const api = apiInstance({});

    return api.put(`action/file/${fileName}`);
  };
}
