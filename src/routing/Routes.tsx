import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { Actions } from "../pages/actions/actions";

import { Authentication } from "../pages/authentication/authentication";
import { Clients } from "../pages/clients/clients";
import { Landing } from "../pages/landing/landing";

// export function RoutesList( {isLoggedIn : boolean} ) {
//   return (
//     <Routes>
//       <Route path="" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} >
//         <Route path="/login" element={<Authentication />} />
//           {/* <Route path="login" element={<Authentication />} /> */}
//             <Route path="/" element={<Landing />}>
//               <Route path="clients" element={<Clients />}> 
//                 <Route path=":clientId" element={<Actions />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/" />} />
//             </Route>
//         </Route>
//     </Routes>
//   );
// }
/* <Route path="/" element={<PrivateRoute />}></Route> */

export const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/clients', element: <Clients />, 
      children: [
        { path: ":clientId", element: <Actions /> }
      ]},
      { path: '/actions', element: <Actions />,
      children: [
        { path: ":actionId", element: <Actions /> }
      ]},
      { path: '*', element: <Navigate to="/" /> },
      {
        path: 'member',
        element: <Outlet />,
        children: [
          // { path: '/', element: <MemberGrid /> },
          // { path: '/add', element: <AddMember /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/" />,
    children: [
      { path: 'login', element: <Authentication /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
];