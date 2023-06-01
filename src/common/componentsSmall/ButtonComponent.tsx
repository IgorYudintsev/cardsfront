import React from "react";
import Button from "@mui/material/Button";

type PropsType = {
  buttonName: string;
  callback: () => void;
  disabled?: boolean;
};

export const ButtonComponent: React.FC<PropsType> = ({ buttonName, callback, disabled = false }) => {
  const onclickHandler = () => {
    callback();
  };
  return (
    <Button variant="contained" type="submit" onClick={onclickHandler} disabled={disabled}>
      {buttonName}
    </Button>
  );
};
