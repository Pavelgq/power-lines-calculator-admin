/* eslint-disable react/jsx-props-no-spreading */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { createClientsFetch } from "../../../store/clientsStore";
import useLocalStorage from "../../../hooks/useLocalStorage";


interface ClientFormProps {
  title: 'Изменить' | 'Добавить';
  open: boolean;
  setOpen: (open: boolean) => void
}


export function ClientForm({title, open, setOpen}: ClientFormProps) {

   const schema = object().shape({
    first_name: string().required('Имя должно быть указано'),
    last_name: string().required("Фамилия доржна быть указана"),
    office_position: string().required("Должность должна быть указана"),
    company: string().required("Название компании должно быть указано"),
    phone_number: number().required("Номер телефона должен быть указан"),
    email:  string().required("Адрес электронной почты должен быть указан").email("Не похоже на адрес электронной почты")

  });

  const { control, register, reset, handleSubmit, watch, formState: { errors } } = useForm<ClientDataInterface>({ resolver: yupResolver(schema) });

  const [token] = useLocalStorage('token');
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<ClientDataInterface> = (data) => {
    console.log(data)
    dispatch(createClientsFetch({data, token}))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    handleSubmit(onSubmit);
    if (Object.keys(errors).length === 0) {
      handleClose();
    }
  }

  return (
   
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title} клиента</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} >
        <DialogContent>
          <DialogContentText>
            Заполните поля формы и нажмите
          </DialogContentText>
          
          <TextField
            margin="dense"
            id="first_name" 
            error={!!errors.first_name}
            label="Имя"
            helperText={errors.first_name ? errors.first_name.message : ''}
            type="text"
            fullWidth
            variant="outlined" 
            {...register('first_name')}
          />
          <TextField
            margin="dense"
            id="last_name" 
            error={!!errors.last_name}
            label="Фамилия"
            helperText={errors.last_name ? errors.last_name.message : ''}
            type="text"
            fullWidth
            variant="outlined" 
            {...register('last_name')}
          />
          <TextField
            margin="dense"
            id="office_position" 
            error={!!errors.office_position}
            label="Должность"
            helperText={errors.office_position ? errors.office_position.message : ''}
            type="text"
            fullWidth
            variant="outlined" 
            {...register('office_position')}
          />
          <TextField
            margin="dense"
            id="company" 
            error={!!errors.company}
            label="Название компании"
            helperText={errors.company ? errors.company.message : ''}
            type="text"
            fullWidth
            variant="outlined" 
            {...register('company')}
          />
          <TextField
            margin="dense"
            id="phone_number" 
            error={!!errors.phone_number}
            label="Номер телефона"
            helperText={errors.phone_number ? errors.phone_number.message : ''}
            type="tel"
            fullWidth
            variant="outlined" 
            {...register('phone_number')}
          />
          <TextField
            margin="dense"
            id="email" 
            error={!!errors.email}
            label="E-mail"
            helperText={errors.email ? errors.email.message : ''}
            type='email'
            fullWidth
            variant="outlined" 
            {...register('email')}
          />

            {/* <Button type="button" onClick={() => reset()}>Очистить</Button>
            <Button type="submit">Подтвердить</Button> */}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="button" onClick={() => reset()}>Очистить</Button>
          <Button type="submit" onClick={handleAction}>{title}</Button>
        </DialogActions>
       </form>
      </Dialog>
    
  )
}