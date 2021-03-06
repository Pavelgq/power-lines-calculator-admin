import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import useLocalStorage from "./useLocalStorage";

interface FetchInterface {
  isLoading: boolean;
  response: any;
  error: Error | null;
  get: (option: AxiosRequestConfig) => void;
  post: (option: AxiosRequestConfig) => void;
}

const useFetch = (url: string): FetchInterface => {
  const baseUrl = "https://hidden-inlet-89012.herokuapp.com/api/v1";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<JSON>();
  const [error, setError] = useState(null);
  const [options, setOptions] = useState<AxiosRequestConfig>();
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((fetchOptions = {}) => {
    setOptions(fetchOptions);
    setIsLoading(true);
  }, []);

  const get = useCallback(() => {
    setIsLoading(true);
  }, []);

  const post = useCallback((fetchOptions: AxiosRequestConfig = {}) => {
    setOptions({ ...fetchOptions, method: "post" });
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipAfterDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: {
          token: token ? `JWC ${token}` : "",
        },
      },
    };
    if (!isLoading) {
      return;
    }
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipAfterDestroy) {
          setResponse(res.data);
          setIsLoading(false);
        }
      })
      .catch((resError) => {
        // Todo What if this error is 404
        if (!skipAfterDestroy) {
          setError(resError.response.data);
          setIsLoading(false);
        }
      });
    // eslint-disable-next-line consistent-return
    return () => {
      skipAfterDestroy = true;
    };
  }, [isLoading, options, token, url]);

  return {
    isLoading,
    response,
    error,
    get,
    post,
  };
};

export default useFetch;
