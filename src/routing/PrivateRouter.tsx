import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

export const PrivateRoute = () => {
    const state = useSelector((state: RootState) => state.admin)

    const auth = state.auth; // determine if authorized, from context or however you're doing it
    console.log('auth', auth)
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}