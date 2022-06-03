import {
  Box,
  Button,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AdminsTable } from "../../components/molecules/AdminsTable/AdminsTable";
import { EditAdminForm } from "../../components/molecules/EditAdminForm/EditAdminForm";
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

      <Container maxWidth="lg">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ marginBottom: 5 }}
        >
          Добавить сотрудника
        </Button>
        <AdminsTable />
      </Container>
    </Box>
  );
}
