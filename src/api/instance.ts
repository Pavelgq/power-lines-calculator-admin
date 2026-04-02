import axios, { AxiosRequestConfig } from "axios";

export interface apiParams {
  token?: string;
  acceptToken?: string;
}

const DEFAULT_BASE_URL = "https://calcdata.energotek.ru/api/v1";

export const getApiBaseUrl = (): string =>
  process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") || DEFAULT_BASE_URL;

export const apiInstance = ({ token = "", acceptToken = "" }: apiParams) => {
  const config: AxiosRequestConfig = {
    baseURL: getApiBaseUrl(),
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
      "accept-token": `${acceptToken}`,
    },
    timeout: Number(process.env.REACT_APP_API_TIMEOUT_MS) || 60000,
  };

  return axios.create(config);
};