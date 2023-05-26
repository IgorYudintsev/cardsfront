import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type PasswordTextInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  rules?: Record<string, unknown>;
  errors: FieldError | undefined;
  passwordsRequire: boolean;
  // showPassword: boolean;
  // handleClickShowPassword: (show: boolean) => void;
  // handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PasswordTextInput: React.FC<PasswordTextInputProps> = (props) => {
  const { name, control, label, rules, errors, passwordsRequire } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl sx={{ m: 1 }} variant="filled" style={{ marginTop: "20px" }}>
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            {...field}
            error={Boolean(fieldState.error)}
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            // helperText={fieldState.error ? fieldState.error.message : null}
          />
          {/*{errors && <span style={{ color: "red" }}>This field is required</span>}*/}
          {errors && <span style={{ color: "red" }}>This field is required</span>}
          {!passwordsRequire && <div style={{ color: "red" }}>Passwords do not match</div>}
        </FormControl>
      )}
    />
  );
};
