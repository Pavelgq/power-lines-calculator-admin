import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  profileAdmin,
  selectCurrentAdmin,
  selectIsAuthenticated,
  selectIsLoadingAdmin,
} from "../store/adminStore";
import { AccessDenied } from "../pages/AccessDenied/AccessDenied";
import { ROLES } from "../interfaces/admin.interface";
import { Loading } from "../components";
import { Authentication } from "../pages/Authentication/Authentication";

interface PrivateRouteProps {
  component: React.ComponentType;
  roles: ROLES[];
  // eslint-disable-next-line react/require-default-props
  path?: string;
}

export function PrivateRoute({
  component: RouteComponent,
  roles,
  path = "",
}: PrivateRouteProps): JSX.Element {
  const user = useSelector(selectCurrentAdmin);
  const isLoading = useSelector(selectIsLoadingAdmin);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userHasRequiredRole = !!(user && roles.includes(user.status));
  const location = useLocation();
  const dispatch = useDispatch();
  const [token] = useLocalStorage("token");
  console.log(location, isAuthenticated, userHasRequiredRole, user);
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    console.log("profile");
    dispatch(profileAdmin({ token }));
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  if (!isAuthenticated && location.pathname !== "/") {
    return <Authentication />;
  }
  return <Outlet />;

  // return <Navigate to="/" />;
}
