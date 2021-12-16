
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './authentication.module.css';

export const Authentication = (): JSX.Element => {
  const apiUrl = '/admin/login';

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccesSubmit, setIsSuccesSubmit] = useState(false);
  const {response, isLoading, error, doFetch} = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage('token');

  const handleSubmit = (event: any) => {
        event.preventDefault()
        const user = {login, password};
        doFetch({
            method: 'POST',
            data: {
                ...user
            }
        })
    }

   useEffect(() => {
        if (!response) {
            return 
        }
        console.log(response);
        setToken(response.token);
        setIsSuccesSubmit(true)
    }, [response, setToken])

    // if (isSuccesSubmit) {
    //     return <Navigate replace to='/clients' />
    // }

  return (
    <div>
      Авторизация
      <form onSubmit={handleSubmit}>
        <label>Логин</label>
        <input 
          type='text'
          value={login}
          onChange={e => setLogin(e.target.value)}
        ></input>
        <label>Логин</label>
        <input 
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button type='submit'>Войти</button>
      </form>
    </div>
  )
}