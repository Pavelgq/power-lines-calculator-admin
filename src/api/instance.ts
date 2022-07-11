import axios, { AxiosRequestConfig } from "axios";

export interface apiParams {
  token?: string;
  acceptToken?: string;
}

// baseURL: `https://hidden-inlet-89012.herokuapp.com/api/v1`,
// baseURL: `http://localhost:8080/api/v1`,
export const apiInstance = ({ token = "", acceptToken = "" }: apiParams) => {
  const config: AxiosRequestConfig<any> = {
    baseURL: `http://calcdata.energotek.ru/api/v1`,
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
      "accept-token": `${acceptToken}`,
    },
    timeout: 2000,
  };

  return axios.create(config);
};
