import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SetNewPasType } from "features/auth/auth.api";

export const SetNewPassword = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    const payload: SetNewPasType = {
      password: "200Dilan-Bars211",
      resetPasswordToken: param.token,
    };
    dispatch(authThunks.setNewPas(payload));
  };

  const goToLogin = useAppSelector((state) => state.auth.goToLogin);

  if (goToLogin) {
    navigate("/login");
  }

  return (
    <>
      <div>SetNewPassword</div>
      <button onClick={onClickHandler}>xxx</button>
    </>
  );
};
