import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { localHelper } from "helpers/localStorage";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [value, setValue] = React.useState<number[]>([0, 8]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      dispatch(
        packsThunks.getPacks(
          localHelper(userIDfromProfile, { min: value[0], max: value[1], pageCount: value[1] - value[0] })
        )
      );
    }
  };

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
}
