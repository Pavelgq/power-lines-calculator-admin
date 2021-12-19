import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'

import useFetch from '../../hooks/useFetch';
import { getClientsFetch } from '../../store/clientsStore';
import styles from './authentication.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';


interface Post {
  first_name: string
  last_name: string
  company: string
  office_position: string
  phone_number: string
  email: string
}

export const Clients = (): JSX.Element => {
  const [token] = useLocalStorage('token');
  const clients = useSelector((state: RootState) => state.clients.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientsFetch({headers: { token }}));
    return () => {

    }
  }, [dispatch])
  console.log(clients)

  return (
    <div>
      {clients}
    </div>
  )
}