import React from "react";
import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { deleteState, loadState, saveState } from "helpers/localStorage";
import { RangeSlider } from "common/componentsSmall/RangeSlider";
import IconButton from "@mui/material/IconButton";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { GetPacksPayload } from "features/packs/packs.api";

type PropsType = {
  titleSearch: string;
  setTitleSearch: (titleSearch: string) => void;
  valueRange: number[];
  setValueRange: (valueRange: number[]) => void;
  pack: GetPacksPayload;
};

export const SearchFilter: React.FC<PropsType> = (props) => {
  const { valueRange, setValueRange, titleSearch, setTitleSearch, pack } = props;
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);

  const allHandler = () => {
    deleteState();
    dispatch(packsThunks.getPacks(pack));
  };
  const myHandler = () => {
    saveState();
    dispatch(packsThunks.getPacks(pack));
  };

  const cleanHandler = () => {
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    setValueRange([0, 10]);
    setTitleSearch("");
  };

  return (
    <MainWrapper>
      <InputWithoutForm title={titleSearch} setTitle={setTitleSearch} pack={pack} />
      <div>
        <ButtonComponent
          buttonName={"My cards"}
          callback={myHandler}
          disabled={false}
          variant={loadState() ? "outlined" : "contained"}
        />
        <ButtonComponent
          buttonName={"All cards"}
          callback={allHandler}
          disabled={false}
          variant={!loadState() ? "outlined" : "contained"}
        />
      </div>
      <RangeSlider value={valueRange} setValue={setValueRange} pack={pack} />

      <div title="reset filters">
        <IconButton aria-label="delete" onClick={cleanHandler}>
          <CleaningServicesIcon />
        </IconButton>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

//-----------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
// import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
// import styled from "styled-components";
// import { useAppDispatch, useAppSelector } from "common/hooks";
// import { packsThunks } from "features/packs/packs.slice";
// import { deleteState, loadState, saveState } from "helpers/localStorage";
// import { RangeSlider } from "common/componentsSmall/RangeSlider";
// import IconButton from "@mui/material/IconButton";
// import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
//
// export const SearchFilter = () => {
//   const dispatch = useAppDispatch();
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   const [value, setValue] = React.useState<number[]>([0, 10]); //RANGE
//   const [title, setTitle] = useState(""); //SEARCH
//
//   const allHandler = () => {
//     deleteState();
//     dispatch(packsThunks.getPacks({ min: value[0], max: value[1], pageCount: value[1] - value[0] }));
//   };
//   const myHandler = () => {
//     saveState();
//     dispatch(
//         packsThunks.getPacks({ user_id: userIDfromProfile, min: value[0], max: value[1], pageCount: value[1] - value[0] })
//     );
//   };
//
//   const cleanHandler = () => {
//     dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
//     setValue([0, 10]);
//     setTitle("");
//   };
//
//   return (
//       <MainWrapper>
//         <InputWithoutForm value={value} title={title} setTitle={setTitle} />
//         <div>
//           <ButtonComponent
//               buttonName={"My cards"}
//               callback={myHandler}
//               disabled={false}
//               variant={loadState() ? "outlined" : "contained"}
//           />
//           <ButtonComponent
//               buttonName={"All cards"}
//               callback={allHandler}
//               disabled={false}
//               variant={!loadState() ? "outlined" : "contained"}
//           />
//         </div>
//         <RangeSlider value={value} setValue={setValue} />
//
//         <div title="reset filters">
//           <IconButton aria-label="delete" onClick={cleanHandler}>
//             <CleaningServicesIcon />
//           </IconButton>
//         </div>
//       </MainWrapper>
//   );
// };
//
// const MainWrapper = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: space-around;
// `;
