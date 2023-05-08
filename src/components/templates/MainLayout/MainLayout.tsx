import { StyledEngineProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { selectIsAuthenticated } from "../../../store/adminStore";
import { getClientsFetch } from "../../../store/clientsStore";
import { Sidebar } from "../../molecules/Sidebar/Sidebar";
import { MainLayoutProps } from "./MainLayout.props";

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const [token] = useLocalStorage("token");
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && token) dispatch(getClientsFetch({ token }));
    return () => {};
  }, [isAuthenticated, token]);

  return (
    <StyledEngineProvider injectFirst>
      <Sidebar />
      <Outlet />
      {/* <div>...</div> */}
    </StyledEngineProvider>
  );
}
