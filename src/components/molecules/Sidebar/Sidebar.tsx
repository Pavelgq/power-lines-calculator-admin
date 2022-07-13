import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FormEvent, MouseEvent, useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import {
  logoutAdmin,
  selectCurrentAdmin,
  selectIsAuthenticated,
} from "../../../store/adminStore";
import { selectRequestClients } from "../../../store/clientsStore";

const pages = [
  {
    title: "Пользователи",
    link: "/clients",
  },
  {
    title: "Запросы",
    link: "/requests",
    badge: true,
  },
  {
    title: "Действия",
    link: "/actions",
  },
];
const settings = ["Добавить администратора", "Изменить пароль", "Выход"];

export function Sidebar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const admin = useSelector(selectCurrentAdmin);
  const auth = useSelector(selectIsAuthenticated);
  const requestsCount = useSelector(selectRequestClients).length;

  const handleOpenNavMenu = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNav = (link: string) => {
    navigate(link);

    handleCloseUserMenu();
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    dispatch(logoutAdmin());
    <Navigate to="/" />;
  };

  if (!auth) {
    return <div> </div>;
  }

  return (
    <AppBar position="static" className={styles.appbar}>
      {admin && (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                marginRight: 7,
                marginLeft: 3,
              }}
            >
              ТЭК
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Badge
                    key={page.title}
                    badgeContent={page.badge && requestsCount}
                    color="secondary"
                  >
                    <MenuItem onClick={() => handleNav(page.link)}>
                      <Link to={page.link} />

                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Badge>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Экран Труба Кабель
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Badge
                  badgeContent={page.badge && requestsCount}
                  color="secondary"
                  className={styles.wrapper}
                  key={page.title}
                >
                  <Button
                    className={styles.menuItem}
                    onClick={() => handleNav(page.link)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.title}
                  </Button>
                </Badge>
              ))}
            </Box>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              {admin.login}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Открыть настройки">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={admin.login} src="#" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleNav("/accaunt")}>
                  <Typography textAlign="center">Личный кабинет</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Typography textAlign="center">Выход</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
}
