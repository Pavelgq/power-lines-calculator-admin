import { ClientDataInterface } from "../../../interfaces/client.interface";

export interface RequestsTableInterface {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  sortConfig: {
    field: string;
    direction: "desc" | "asc" | undefined;
  };
  sortingField: (field: string) => void;
  items: number[];
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
