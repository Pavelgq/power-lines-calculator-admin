import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { ROLES } from "../interfaces/admin.interface";
import { ClientActions } from "../pages/ClientActions/ClientActions";

import { Authentication } from "../pages/Authentication/Authentication";
import { Clients } from "../pages/Clients/Clients";
import { PrivateRoute } from "./PrivateRouter";
import { AllActions } from "../pages/AllActions/AllActions";
import { PersonalAccaunt } from "../pages/PersonalAccaunt/PersonalAccaunt";

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
            element={<PrivateRoute roles={[ROLES.ADMIN]} component={Clients} />}
          />
        </Route>
        <Route
          path="actions"
          element={
            <PrivateRoute roles={[ROLES.ADMIN]} component={AllActions} />
          }
        >
          <Route
            path=":clientId"
            element={
              <PrivateRoute roles={[ROLES.ADMIN]} component={AllActions} />
            }
          />
        </Route>
        <Route
          path="accaunt"
          element={
            <PrivateRoute roles={[ROLES.ADMIN]} component={PersonalAccaunt} />
          }
        />
      </Route>
    </Routes>
  );
}
