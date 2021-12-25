import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'

import useFetch from '../../hooks/useFetch';
import { createClientsFetch, getClientsFetch } from '../../store/clientsStore';
import styles from './authentication.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';


export const Clients = (): JSX.Element => {
  const [token] = useLocalStorage('token');
  const clients = useSelector((state: RootState) => state.clients.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientsFetch({token}));
    return () => {

    }
  }, [dispatch])
  console.log(clients)

  const handleSubmit = () => {
    console.log('submit')
    dispatch(createClientsFetch({
      "first_name": "Pavel1",
      "last_name": "Gord1",
      "company": "ZEU1",
      "office_position": "123421",
      "phone_number": "8999999942",
      "email": "afsdf23@dsf34a.ru"
    }))
  }

  return (
    <div>
      <button type='submit' onSubmit={handleSubmit}>Создать</button>
    </div>
  )
}