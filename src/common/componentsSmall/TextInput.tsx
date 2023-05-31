import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";

type TextInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  rules?: Record<string, unknown>;
  errors: FieldError | undefined;
};

export const TextInput: React.FC<TextInputProps> = ({ name, control, label, rules, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue="developeryudintsev@gmail.com"
      render={({ field, fieldState }) => (
        <>
          <TextField
            {...field}
            sx={{ m: 1 }}
            label={label}
            error={Boolean(fieldState.error)}
            variant="filled"
            defaultValue={field.value}
          />
          {errors && <span style={{ color: "red" }}>This field is required</span>}
        </>
      )}
    />
  );
};
