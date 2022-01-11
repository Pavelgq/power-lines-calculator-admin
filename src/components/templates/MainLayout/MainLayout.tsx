import { Outlet } from "react-router-dom";
import { Sidebar } from "../../molecules/Sidebar/Sidebar";
import { MainLayoutProps } from "./MainLayout.props";

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Sidebar />
      <Outlet />
      <div>Footer</div>
    </>
  );
}
