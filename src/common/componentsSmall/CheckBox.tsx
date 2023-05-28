import React from "react";
import { Control, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";

type CheckBoxProps = {
  name: string;
  control: Control<any>;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <WrapperCheckBox>
            <Checkbox defaultChecked />
            <span style={{ marginTop: "10px" }}>Remember me</span>
          </WrapperCheckBox>
        </>
      )}
    />
  );
};

const WrapperCheckBox = styled.span`
  display: flex;
  text-align: left;
`;
