import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { ROLES } from "../interfaces/admin.interface";

import { Authentication } from "../pages/Authentication/Authentication";
import { Clients } from "../pages/Clients/Clients";
import { PrivateRoute } from "./PrivateRouter";
import { AllActions } from "../pages/AllActions/AllActions";
import { PersonalAccaunt } from "../pages/PersonalAccaunt/PersonalAccaunt";
import { Requests } from "../pages/Requests/Requests";

export function RoutesList(props: any): JSX.Element {
  const { isLoggedIn } = props;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            roles={[ROLES.ADMIN, ROLES.USER, ROLES.GUEST]}
            component={MainLayout}
          />
        }
      >
        <Route index element={<Authentication />} />
        <Route
          path="clients"
          element={
            <PrivateRoute
              roles={[ROLES.ADMIN, ROLES.USER]}
              component={Clients}
            />
          }
        >
          <Route
            path=":clientId"
            element={
              <PrivateRoute
                roles={[ROLES.ADMIN, ROLES.USER]}
                component={Clients}
              />
            }
          />
        </Route>
        <Route
          path="requests"
          element={
            <PrivateRoute
              roles={[ROLES.ADMIN, ROLES.USER]}
              component={Requests}
            />
          }
        />
        <Route
          path="actions"
          element={
            <PrivateRoute
              roles={[ROLES.ADMIN, ROLES.USER]}
              component={AllActions}
            />
          }
        >
          <Route
            path=":clientId"
            element={
              <PrivateRoute
                roles={[ROLES.ADMIN, ROLES.USER]}
                component={AllActions}
              />
            }
          />
        </Route>
        <Route
          path="accaunt"
          element={
            <PrivateRoute
              roles={[ROLES.ADMIN, ROLES.USER]}
              component={PersonalAccaunt}
            />
          }
        />
      </Route>
    </Routes>
  );
}
