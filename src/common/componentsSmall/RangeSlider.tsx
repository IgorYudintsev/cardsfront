import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { localHelper } from "helpers/localStorage";
import { useEffect } from "react";
import { GetPacksPayload } from "features/packs/packs.api";

function valuetext(value: number) {
  return `${value}°C`;
}
type PropsType = {
  setValue: (value: number[]) => void;
  value: number[];
  pack: GetPacksPayload;
};

export const RangeSlider: React.FC<PropsType> = ({ setValue, value, pack }) => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, pack)));
    }
  };
  useEffect(() => {
    packsThunks.getPacks(localHelper(userIDfromProfile, pack));
  }, []);

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};
