import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface SearchProps {
  value: string;
  handleChange: (newValue: string) => void;
}

export function Search({ value, handleChange }: SearchProps): JSX.Element {
  return (
    <TextField
      fullWidth
      type="search"
      variant="outlined"
      id="input-search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value)
      }
    />
  );
}
