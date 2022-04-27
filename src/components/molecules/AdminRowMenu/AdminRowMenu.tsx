import { Tooltip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import {
  deleteClientFetch,
  selectAllClients,
} from "../../../store/clientsStore";
import { AdminRowMenuProps } from "./AdminRowMenu.props";
import { EditAdminForm } from "../EditAdminForm/EditAdminForm";
import { deleteAdminFetch } from "../../../store/adminStore";

export function AdminRowMenu({ id }: AdminRowMenuProps): JSX.Element {
  const navigate = useNavigate();
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(
    null
  );

  const [token] = useLocalStorage("token");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const clientData = useSelector(selectAllClients)[id];
  const dispatch = useDispatch();

  const handleOpenActionMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElAction(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setAnchorElAction(null);
  };

  const handleToggleUpdate = () => {
    if (!id) {
      return;
    }
    setOpenUpdate(!openUpdate);
    handleCloseActionMenu();
  };
  const handleToggleAlert = () => {
    if (!id) {
      return;
    }
    setOpenAlert(!openAlert);
    handleCloseActionMenu();
  };

  const handleDelete = () => {
    dispatch(deleteAdminFetch({ token, id }));
    setOpenAlert(!openAlert);
    handleCloseActionMenu();
  };

  return (
    <>
      <EditAdminForm
        action="change"
        open={openUpdate}
        setOpen={setOpenUpdate}
        id={id}
      />
      <AlertDialog
        open={openAlert}
        handleClose={handleToggleAlert}
        handleChange={handleDelete}
      />
      <Tooltip title="Открыть настройки">
        <IconButton
          color="primary"
          aria-label="Действия с аккаунтом"
          onClick={handleOpenActionMenu}
        >
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElAction}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElAction)}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleToggleUpdate}>
          <Typography textAlign="center">Изменить данные</Typography>
        </MenuItem>
        <MenuItem onClick={handleToggleAlert}>
          <Typography textAlign="center">Удалить аккаунт</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
