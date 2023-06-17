import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "common/hooks";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<number[]>([0, 8]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(packsThunks.getPacks({ min: value[0], max: value[1], pageCount: value[1] - value[0] }));
      // dispatch(cardsThunks.getCards({ max,min,pageCount:value[1]-value[0]})); // props.setLoading(false);
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

//---------------------------------------------------------------------------------
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import { useEffect } from "react";
// import { useAppDispatch } from "common/hooks";
// import { packsThunks } from "features/packs/packs.slice";
// //import {cardsThunks} from "./cards.slice";
// //import {useAppDispatch} from "../../common/hook/useAppDispatch";
//
// function valuetext(value: number) {
//   return `${value}°C`;
// }
//
// export const RangeSlider: React.FC<{ min: number; max: number }> = ({ min, max }) => {
//   const dispatch = useAppDispatch();
//   const [value, setValue] = React.useState<number[]>([min, max]);
//   const handleChange = (event: Event, newValue: number | number[]) => {
//     setValue(newValue as number[]);
//     console.log(newValue);
//   };
//
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       dispatch(packsThunks.getPacks({ max, min, pageCount: value[1] - value[0] }));
//       // dispatch(cardsThunks.getCards({ max,min,pageCount:value[1]-value[0]})); // props.setLoading(false);
//     }, 600);
//     return () => clearTimeout(timeoutId);
//   }, [value]);
//   return (
//     <Box>
//       <Slider
//         value={value}
//         min={min}
//         max={max}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         aria-labelledby="range-slider"
//         getAriaValueText={valuetext}
//         color="primary"
//         size={"small"}
//       />
//     </Box>
//   );
// };
