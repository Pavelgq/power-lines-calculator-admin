import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Divider,
  Container,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { AdminsTable } from "../../components/molecules/AdminsTable/AdminsTable";
import { ChangeAdminForm } from "../../components/molecules/ChangeAdminForm/ChangeAdminForm";
import { EditAdminForm } from "../../components/molecules/EditAdminForm/EditAdminForm";
import { ROLES } from "../../interfaces/admin.interface";
import { selectCurrentAdmin } from "../../store/adminStore";

export function PersonalAccaunt() {
  const [value, setValue] = useState("1");
  const [openCreate, setOpenCreate] = useState(false);

  const admin = useSelector(selectCurrentAdmin);

  const handleCreate = () => {
    if (admin?.status === "admin") {
      setOpenCreate(!openCreate);
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <EditAdminForm
        action="create"
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleCreate}
      >
        Добавить администратора
      </Button>
      {/* <Divider sx={{ marginBottom: 2 }} /> */}
      <AdminsTable />
    </Box>
  );
}
