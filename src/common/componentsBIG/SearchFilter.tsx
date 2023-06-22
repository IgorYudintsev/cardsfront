import React, { useEffect, useState } from "react";
import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import { deleteState, loadState, localHelper, saveState } from "helpers/localStorage";
import { authActions } from "features/auth/auth.slice";
import { RangeSlider } from "common/componentsSmall/RangeSlider";
import IconButton from "@mui/material/IconButton";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [value, setValue] = React.useState<number[]>([0, 8]); //RANGE
  const [title, setTitle] = useState(""); //SEARCH

  const allHandler = () => {
    deleteState();
    dispatch(packsThunks.getPacks({ min: value[0], max: value[1], pageCount: value[1] - value[0] }));
  };
  const myHandler = () => {
    saveState();
    dispatch(
      packsThunks.getPacks({ user_id: userIDfromProfile, min: value[0], max: value[1], pageCount: value[1] - value[0] })
    );
  };

  const cleanHandler = () => {
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 8 } : { pageCount: 8 }));
    setValue([0, 8]);
    setTitle("");
  };

  return (
    <MainWrapper>
      <InputWithoutForm value={value} title={title} setTitle={setTitle} />
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
      <RangeSlider value={value} setValue={setValue} />

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
