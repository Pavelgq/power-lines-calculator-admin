import { Tooltip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { ClientRowMenuInterface } from "./ClientRowMenu.interface";
import { EditClientForm } from "../EditClientForm/EditClientForm";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import {
  deleteClientFetch,
  selectAllClients,
} from "../../../store/clientsStore";
import { KeygenDialog } from "../KeygenDialog/KeygenDialog";

export function ClientRowMenu({
  id,
  isKey = false,
}: ClientRowMenuInterface): JSX.Element {
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(
    null
  );
  const [token] = useLocalStorage("token");
  const [openGenerate, setOpenGenerate] = useState(false);
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
  const handleGenerate = () => {
    setOpenGenerate(true);
    handleCloseActionMenu();
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

  const handleDeleteSelectClient = () => {
    if (!id) {
      return;
    }
    dispatch(deleteClientFetch({ token, id }));
    setOpenAlert(!openAlert);
  };

  return (
    <>
      <KeygenDialog
        clientId={id}
        toggle={openGenerate}
        handleClose={setOpenGenerate}
      />
      <EditClientForm open={openUpdate} clientId={id} setOpen={setOpenUpdate} />
      <AlertDialog
        open={openAlert}
        handleClose={handleToggleAlert}
        handleChange={handleDeleteSelectClient}
      />
      <Tooltip title="Открыть настройки">
        <IconButton
          color="primary"
          aria-label="Действия с пользователем"
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
        {!clientData.isAccept && (
          <MenuItem onClick={handleGenerate}>
            <Typography textAlign="center">Генерировать новый ключ</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleToggleUpdate}>
          <Typography textAlign="center">Изменить данные</Typography>
        </MenuItem>
        <MenuItem onClick={handleToggleAlert}>
          <Typography textAlign="center">Удалить пользователя</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
