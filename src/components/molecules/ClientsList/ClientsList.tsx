import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useSortableData } from "../../../hooks/useSortableData";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import { ClientDataInterface } from "../../../interfaces/client.interface";
import { selectAllClients, selectAllIds } from "../../../store/clientsStore";
import { ClientCardList } from "../ClientCardList/ClietnCardList";
import { ClientTable } from "../ClientTable/ClientTable";
import { CreateClientForm } from "../CreateClientForm/CreateClientForm";
import { Search } from "../Search/Search";

const columns = [
  {
    field: "ordinal",
    headerName: "№",
    width: 20,
    numeric: false,
    sorting: true,
    search: false,
  },
  {
    field: "last_name",
    headerName: "Фамилия",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "first_name",
    headerName: "Имя",
    width: 70,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "company",
    headerName: "Компания",
    width: 130,
    numeric: false,
    sorting: true,
    search: true,
  },
  {
    field: "office_position",
    headerName: "Должность",
    width: 130,
    numeric: false,
    sorting: false,
    search: false,
  },
  {
    field: "phone_number",
    headerName: "Телефон",
    width: 80,

    sorting: false,
    search: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
    sorting: false,
    search: false,
  },
  {
    field: "acceptKey",
    headerName: "Ключ",
    width: 130,
    sorting: false,
    search: false,
  },
  {
    field: "actions",
    headerName: "",
    width: 130,
    sorting: false,
    search: false,
  },
];

const searchFields = columns.filter((el) => el.search).map((el) => el.field);

export function ClientsList() {
  const { clientId } = useParams() || "";
  const [windowsX, windowsY] = useWindowSize();
  const [selectClient, setSelectClient] = useState(0);
  const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchValue, setSearchValue] = useState("");

  const [token] = useLocalStorage("token");

  const data = useSelector(selectAllClients);
  const allIds = useSelector(selectAllIds);

  const { items, sortConfig, sortingField } = useSortableData<{
    [id: string]: ClientDataInterface;
  }>(allIds, data, searchValue, searchFields);

  useEffect(() => {
    if (clientId && Object.prototype.hasOwnProperty.call(data, clientId)) {
      setSearchValue(`${data[clientId].last_name}`); // ${data[clientId].first_name}
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCreate = () => {
    setSelectClient(0);
    setOpenAddClientDialog(true);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid
        container
        wrap="nowrap"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs justifyContent="center" alignItems="center">
          <Container>
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={handleOpenCreate}
            >
              Добавить пользователя
            </Button>
            <CreateClientForm
              title="Добавить"
              open={openAddClientDialog}
              setOpen={setOpenAddClientDialog}
            />
          </Container>
        </Grid>
        <Grid item xs={9}>
          <Search value={searchValue} handleChange={setSearchValue}  />
        </Grid>
      </Grid>
      <Grid item>
        {windowsX > 1000 ? (
          <ClientTable
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            sortConfig={sortConfig}
            sortingField={sortingField}
            page={page}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <ClientCardList items={items} />
        )}
      </Grid>
    </Grid>
  );
}
