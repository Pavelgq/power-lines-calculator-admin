import { Outlet } from "react-router-dom"
import { LayoutProps } from "./layout.props"


export const Layout = ({children}: LayoutProps): JSX.Element => {
  return (
    <>
      <div>Sidebar</div>
      <Outlet />
      <div>Footer</div>
    </>
  )
}