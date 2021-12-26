import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { profileAdmin } from "../store/adminStore";
import { RootState } from "../store/store";

export function PrivateRoute() {
  const adminState = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  const [token] = useLocalStorage("token");
  const { auth } = adminState; // determine if authorized, from context or however you're doing it

  useEffect(() => {
    if (auth) {
      return;
    }
    dispatch(profileAdmin({ token }));
  }, []);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
