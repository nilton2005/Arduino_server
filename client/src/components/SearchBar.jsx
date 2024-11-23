import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      label="Buscar productos"
      variant="outlined"
      fullWidth
      onChange={(e) => onSearch(e.target.value)}
      margin="normal"
    />
  );
};

export default SearchBar;
