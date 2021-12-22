
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { createAdminFetch, loginAdmin } from '../../store/adminStore';
import { RootState } from '../../store/store';
import styles from './authentication.module.css';

export const Authentication = (): JSX.Element => {
  // const apiUrl = '/admin/login';

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccesSubmit, setIsSuccesSubmit] = useState(false);
  // const {post, response, isLoading, error} = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage('token');

  const state = useSelector((state: RootState) => state.admin)
  const dispatch = useDispatch()

  const handleSubmit = (event: any) => {
        event.preventDefault()
        dispatch(loginAdmin({ login, password, token}));
        
    }

   useEffect(() => {

    }, [])

    if (isSuccesSubmit) {
        return <Navigate
          to={`/clients`}
          replace
        />
    }

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