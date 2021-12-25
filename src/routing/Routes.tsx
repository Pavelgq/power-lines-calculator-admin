import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Layout } from '../components/templates/layout/layout';

import { Authentication } from '../pages/authentication/authentication';
import { Clients } from '../pages/clients/clients';
import { PrivateRoute } from './PrivateRouter';

export const RoutesList = () => (
  <Routes>
    <Route path='/login' element={<Authentication/>} />
    
    <Route path='/' element={<PrivateRoute/>}>
       <Route path='/' element={<Layout/>}>
        <Route path='/clients' element={<Clients/>} />
      </Route>
    </Route>
   
  </Routes>
)

