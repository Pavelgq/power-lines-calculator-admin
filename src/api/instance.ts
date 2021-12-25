import axios, { AxiosRequestConfig } from "axios";

export interface apiParams {
  token?: string;
}

export const apiInstance = ({ token = "" }: apiParams) => {
  const config: AxiosRequestConfig<any> = {
    baseURL: `https://hidden-inlet-89012.herokuapp.com/api/v1`,
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
    timeout: 1000,
  };

  return axios.create(config);
};
