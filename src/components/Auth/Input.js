import React from "react";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import { TextValidator } from "react-material-ui-form-validator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  half,
  handleChange,
  label,
  type,
  handleShowPassword,
  autoFocus,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextValidator
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </Grid>
  );
};

export default Input;
