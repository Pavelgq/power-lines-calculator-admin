import { StyledEngineProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { getClientsFetch } from "../../../store/clientsStore";
import { Sidebar } from "../../molecules/Sidebar/Sidebar";
import { MainLayoutProps } from "./MainLayout.props";

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const [token] = useLocalStorage("token");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Запрос клиентов из MainLayout");
    dispatch(getClientsFetch({ token }));
    return () => {};
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Sidebar />
      <Outlet />
      {/* <div>...</div> */}
    </StyledEngineProvider>
  );
}
