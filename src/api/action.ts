import queryString from "query-string";
import { ActionCreateInterface } from "../interfaces/action.interface";
import { apiInstance } from "./instance";

export class Action {
  getAllActions = (
    token: string,
    sort: {
      field: string;
      dir: "ASC" | "DESC";
    },
    period: "all" | "day" | "week" | "month" | "year",
    page: number = 1,
    limit: number = 5,
    filters: object = {}
  ) => {
    const api = apiInstance({ token });

    const queryFilters = Object.keys(filters).map(
      (el) => `filter[${el}]=${filters[el as keyof object]}`
    );
    console.log(queryFilters);
    const path = `/action/all?page=${page}&limit=${limit}&period=${period}&sort[${
      sort.field
    }]=${sort.dir}&${queryFilters.join("&")}`;
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
