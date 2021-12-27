import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { profileAdmin } from "../store/adminStore";
import { RootState } from "../store/store";
import { routes } from "./Routes";

export function PrivateRoute(): JSX.Element {
  const adminState = useSelector((state: RootState) => state.admin);
  

  const dispatch = useDispatch();

  const [token] = useLocalStorage("token");
  const { auth } = adminState; // determine if authorized, from context or however you're doing it
  const routing = useRoutes(routes(auth));

  useEffect(() => {
    if (auth) {
      return;
    }
    dispatch(profileAdmin({ token }));
  }, []);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {routing}
    </>  
  );
}
