import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import useLocalStorage from './useLocalStorage';

interface FetchInterface {
    isLoading: boolean
    response: any
    error: Error | null
    doFetch: (optiob:Object) => void
}

const useFetch = (url: string, option = {}): FetchInterface => {
  const baseUrl = 'https://hidden-inlet-89012.herokuapp.com/api/v1';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Object>({});
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(option);
  const [token] = useLocalStorage('token');
  
 const doFetch = useCallback((fetchOptions = {}) => {
    setOptions(fetchOptions)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    let skipAfterDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: {
          token: token ? `JWC ${token}` : '',
        },
      },
    }
    if (!isLoading) {
      return
    }
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipAfterDestroy) {
          setResponse(res.data)
          setIsLoading(false)
        }
      })
      .catch((resError) => {
        // Todo What if this error is 404
        if (!skipAfterDestroy) {
          setError(resError.response.data)
          setIsLoading(false)
        }
      })
      return () => {
        skipAfterDestroy = true;
      }
  }, [isLoading, options, token, url]);

  return {
    isLoading,
    response,
    error,
    doFetch,
  }
}

export default useFetch
