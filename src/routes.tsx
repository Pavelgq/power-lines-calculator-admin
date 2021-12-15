import React from 'react';
import {Routes, Route} from 'react-router-dom';

import { Authentication } from './pages/authentication/authentication';
import { Clients } from './pages/clients/clients';

export const RoutesList = () => (
  <Routes>
    <Route path='/' element={<Authentication/>} />
    <Route path='/clients' element={<Clients/>} />

  </Routes>
)