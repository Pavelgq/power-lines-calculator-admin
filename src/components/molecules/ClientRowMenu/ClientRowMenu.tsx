import { Tooltip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ClientRowMenuInterface } from "./ClientRowMenu.interface";

const settings = ["Ключ", "Изменить", "Удалить"];

export function ClientRowMenu({ id }: ClientRowMenuInterface): JSX.Element {
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(
    null
  );

  const handleOpenActionMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElAction(event.currentTarget);
    console.log("Action menu");
  };

  const handleCloseActionMenu = () => {
    setAnchorElAction(null);
  };

  return (
    <>
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseActionMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
