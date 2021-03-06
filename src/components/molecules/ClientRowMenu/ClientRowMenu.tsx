import {
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ButtonBase,
  Popover,
  Button,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElAction, setAnchorElAction] = useState<null | HTMLElement>(
    null
  );
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
    handleCloseActionMenu();
  };

  const handleCopy = (event: React.MouseEvent<HTMLLIElement>) => {
    if (clientData?.client_key) {
      // document.execCommand("copy");
      navigator.clipboard.writeText(clientData.client_key);
      setCopied(true);
      // setAnchorEl(event.currentTarget);
      setTimeout(() => {
        setCopied(false);
        setAnchorEl(null);
      }, 1000);
      handleCloseActionMenu();
    }
  };

  const handleActions = () => {
    const path = `/clients/${id}`;
    navigate(path);
    handleCloseActionMenu();
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
      <Tooltip title="?????????????? ??????????????????">
        <IconButton
          color="primary"
          aria-label="???????????????? ?? ??????????????????????????"
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
        <MenuItem onClick={handleCopy}>
          <Typography textAlign="center">???????????????????? ????????</Typography>
          <Popover
            open={copied}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography variant="body2" margin={1}>
              ??????????????????????
            </Typography>
          </Popover>
        </MenuItem>
        <MenuItem onClick={handleGenerate}>
          <Typography textAlign="center">???????????????????????? ?????????? ????????</Typography>
        </MenuItem>
        <MenuItem onClick={handleToggleUpdate}>
          <Typography textAlign="center">???????????????? ????????????</Typography>
        </MenuItem>
        <MenuItem onClick={handleToggleAlert}>
          <Typography textAlign="center">?????????????? ????????????????????????</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
