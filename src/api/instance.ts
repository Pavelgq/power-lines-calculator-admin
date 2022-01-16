import axios, { AxiosRequestConfig } from "axios";

export interface apiParams {
  token?: string;
  acceptToken?: string;
}

export const apiInstance = ({ token = "", acceptToken = "" }: apiParams) => {
  const config: AxiosRequestConfig<any> = {
    baseURL: `https://hidden-inlet-89012.herokuapp.com/api/v1`,
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
      "accept-token": `${acceptToken}`,
    },
    timeout: 1000,
  };

  return axios.create(config);
};
