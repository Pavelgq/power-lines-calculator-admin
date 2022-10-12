import axios, { AxiosRequestConfig } from "axios";

export interface apiParams {
  token?: string;
  acceptToken?: string;
}

let baseUrl = 'http://localhost:8080/api/v1'
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:8080/api/v1'
    break;
    case 'production':
    baseUrl = 'https://calcdata.energotek.ru/api/v1'
    break;
    case 'test':
    baseUrl = 'https://hidden-inlet-89012.herokuapp.com/api/v1'
    break;
  default:
    baseUrl = 'http://localhost:8080/api/v1'
    break;
}

// baseURL: `https://hidden-inlet-89012.herokuapp.com/api/v1`,
// baseURL: `http://localhost:8080/api/v1`,
export const apiInstance = ({ token = "", acceptToken = "" }: apiParams) => {
  const config: AxiosRequestConfig<any> = {
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
      "accept-token": `${acceptToken}`,
    },
    timeout: 2000,
  };

  return axios.create(config);
};
