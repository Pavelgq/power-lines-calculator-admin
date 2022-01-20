import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { ROLES } from "../interfaces/admin.interface";
import { ClientActions } from "../pages/ClientActions/ClientActions";

import { Authentication } from "../pages/Authentication/Authentication";
import { Clients } from "../pages/Clients/Clients";
import { PrivateRoute } from "./PrivateRouter";
import { AllActions } from "../pages/AllActions/AllActions";

export function RoutesList(props: any): JSX.Element {
  const { isLoggedIn } = props;
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Authentication />} />
        <Route
          path="clients"
          element={<PrivateRoute roles={[ROLES.ADMIN]} component={Clients} />}
        >
          <Route
            path=":clientId"
            element={
              <PrivateRoute roles={[ROLES.ADMIN]} component={ClientActions} />
            }
          />
        </Route>
        <Route
          path="actions"
          element={
            <PrivateRoute roles={[ROLES.ADMIN]} component={AllActions} />
          }
        />
      </Route>
    </Routes>
  );
}
/* <Route path="/" element={<PrivateRoute />}></Route> */

// export const routes = (isLoggedIn: boolean) => [
//   {
//     path: '/',
//     element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
//     children: [
//       { path: '/', element: <Landing /> },
//       { path: '/clients', element: <Clients />,
//       children: [
//         { path: ":clientId", element: <Actions /> }
//       ]},
//       // { path: '/actions', element: <Actions />,
//       // children: [
//       //   { path: ":actionId", element: <Actions /> }
//       // ]},
//       { path: '*', element: <Navigate to="/" /> },
//       {
//         path: 'member',
//         element: <Outlet />,
//         children: [
//           // { path: '/', element: <MemberGrid /> },
//           // { path: '/add', element: <AddMember /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/',
//     element: !isLoggedIn ? <MainLayout /> : <Navigate to="/" />,
//     children: [
//       { path: 'login', element: <Authentication /> },
//       { path: '/', element: <Navigate to="/login" /> },
//     ],
//   },
// ];
