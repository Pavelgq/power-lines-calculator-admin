import { Tooltip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";
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
import {
  deleteAdminFetch,
  selectAllAdmins,
  selectCurrentAdmin,
  selectIsError,
} from "../../../store/adminStore";
import { CustomSnackbar } from "../CustomSnackbar/CustomSnackbar";

export function AdminRowMenu({ id }: AdminRowMenuProps): JSX.Element {
  const navigate = useNavigate();
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(
    null
  );

  const [token] = useLocalStorage("token");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const adminData = useSelector(selectAllAdmins).find((el) => el.id === id);
  const currentData = useSelector(selectCurrentAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (success.length > 0) {
        setSuccess("");
      }
      if (error.length > 0) {
        setError("");
      }
    }, 1000);
  }, [error]);

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
    if (
      adminData?.status === "admin" &&
      adminData.id !== Number(currentData?.id)
    ) {
      setError("Вы не можете изменить данные другого администратора");
      return;
    }
    setOpenUpdate(!openUpdate);
    handleCloseActionMenu();
  };
  const handleToggleAlert = () => {
    if (!id) {
      return;
    }
    if (
      adminData?.status === "admin" &&
      adminData.id !== Number(currentData?.id)
    ) {
      setError("Вы не можете удалить другого администратора");
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
      {error && (
        <CustomSnackbar
          trigger={error.length > 0}
          message={error}
          variant="error"
        />
      )}
      {success && (
        <CustomSnackbar
          trigger={success.length > 0}
          message={success}
          variant="success"
        />
      )}
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
          <Typography textAlign="center">Удалить сотрудника</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
