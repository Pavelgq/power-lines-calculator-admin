import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/templates/layout/layout";
import { Actions } from "../pages/actions/actions";

import { Authentication } from "../pages/authentication/authentication";
import { Clients } from "../pages/clients/clients";
import { PrivateRoute } from "./PrivateRouter";

export function RoutesList() {
  return (
    <Routes>
      <Route path="/login" element={<Authentication />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="*" element={<Layout />}>
          <Route path="clients" element={<Clients />} />
          <Route path=":clientId" element={<Actions />} />
        </Route>
      </Route>
    </Routes>
  );
}
