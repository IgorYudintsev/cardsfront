import React, { useEffect, useState } from "react";
import { InputWithoutForm } from "common/componentsSmall/InputWithoutForm";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import RangeSlider from "common/componentsSmall/RangeSlider";
import { deleteState, saveState } from "helpers/localStorage";
import { authActions } from "features/auth/auth.slice";

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  //const packs = useAppSelector((state) => state.packs.cardPacks);
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const allHandler = () => {
    deleteState();
    dispatch(packsThunks.getPacks({ pageCount: 8 }));
  };
  const myHandler = () => {
    saveState();
    // dispatch(authActions.setGoToLogin({ goToLogin: true }));
    dispatch(packsActions.cleanPacks()); //зачищаем стейт прежде чем перерубать
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
