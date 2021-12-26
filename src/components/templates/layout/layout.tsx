import { Outlet } from "react-router-dom"
import { Sidebar } from "../../molecules/Sidebar/Sidebar"
import { LayoutProps } from "./layout.props"


export function Layout({children}: LayoutProps): JSX.Element {
  return (
    <>
      <Sidebar />
      <Outlet />
      <div>Footer</div>
    </>
  )
}