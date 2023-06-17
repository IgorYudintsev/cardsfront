import React, { useEffect, useState } from "react";
import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import RangeSlider from "common/componentsSmall/RangeSlider";

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  //const packs = useAppSelector((state) => state.packs.cardPacks);
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const allHandler = () => {
    dispatch(packsThunks.getPacks({ pageCount: 8 }));
  };
  const myHandler = () => {
    dispatch(packsThunks.getPacks({ user_id: userIDfromProfile }));
  };
  return (
    <MainWrapper>
      <InputWithoutForm />
      <div>
        <ButtonComponent buttonName={"My cards"} callback={myHandler} disabled={false} />
        <ButtonComponent buttonName={"All cards"} callback={allHandler} disabled={false} />
      </div>
      {/*<RangeSlider min={8} max={100} />*/}
      <RangeSlider />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
