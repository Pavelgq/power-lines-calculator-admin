import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  profileAdmin,
  selectCurrentAdmin,
  selectIsAuthenticated,
  selectIsLoadingAdmin,
} from "../store/adminStore";
import { AccessDenied } from "../pages/AccessDenied/AccessDenied";
import { ROLES } from "../interfaces/admin.interface";

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

  console.log(user, isAuthenticated, userHasRequiredRole);
  const dispatch = useDispatch();

  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    dispatch(profileAdmin({ token }));
  }, []);

  if (isLoading) {
    return <span>Загрузка...</span>;
  }

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Navigate to="/" />;
}
