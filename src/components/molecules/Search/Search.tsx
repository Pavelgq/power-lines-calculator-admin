import SearchIcon from "@mui/icons-material/Search";
import { Chip, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

export interface SearchProps {
  value: string;
  handleChange: (newValue: string) => void;
  filterUser?: string;
  deleteFilterUser?: () => void;
  placeholderWhenFiltered?: string;
}

export function Search({
  value,
  handleChange,
  filterUser = "",
  deleteFilterUser,
  placeholderWhenFiltered,
}: SearchProps): JSX.Element {
  return (
    <TextField
      fullWidth
      type="search"
      variant="outlined"
      id="input-search"
      value={value}
      placeholder={
        filterUser
          ? placeholderWhenFiltered ?? "Дополнительный поиск…"
          : undefined
      }
      InputProps={{
        startAdornment: (
          <>
            {filterUser ? (
              <Chip
                key={filterUser}
                tabIndex={-1}
                label={filterUser}
                onDelete={deleteFilterUser}
                sx={{ mr: 0.5, maxWidth: { xs: "55%", sm: "50%" } }}
              />
            ) : null}
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          </>
        ),
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value)
      }
    />
  );
}
