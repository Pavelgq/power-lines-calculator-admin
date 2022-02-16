import { StyledEngineProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../molecules/Sidebar/Sidebar";
import { MainLayoutProps } from "./MainLayout.props";

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <Sidebar />
      <Outlet />
      {/* <div>...</div> */}
    </StyledEngineProvider>
  );
}
