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
import { ChangeAdminForm } from "../../components/molecules/ChangeAdminForm/ChangeAdminForm";
import { ROLES } from "../../interfaces/admin.interface";
import { selectCurrentAdmin } from "../../store/adminStore";

export function PersonalAccaunt() {
  const [value, setValue] = useState("1");

  const admin = useSelector(selectCurrentAdmin);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Изменить данные аккаунта" value="1" />
            {admin?.status === ROLES.ADMIN && (
              <Tab label="Добавить сотрудника" value="2" />
            )}
          </TabList>
        </Box>
        <TabPanel value="1">
          <Divider sx={{ marginBottom: 2 }} />
          <ChangeAdminForm action="change" />
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Button variant="contained">Удалить аккаунт</Button>
        </TabPanel>
        <TabPanel value="2">
          <Divider sx={{ marginBottom: 2 }} />
          <ChangeAdminForm action="create" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
