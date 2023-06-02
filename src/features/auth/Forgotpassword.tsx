import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { ForgotForm } from "common/componentsBIG/ForgotForm";
import { ForgetPasswordType } from "features/auth/auth.api";
import { useNavigate } from "react-router-dom";

export const Forgotpassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailSended = useAppSelector((state) => state.auth.emailSended);

  const queryLogin = (payload: ForgetPasswordType) => {
    dispatch(authThunks.forgetpassword(payload));
  };

  if (emailSended) {
    navigate("/check");
  }

  return (
    <div>
      <ForgotForm title={"Forgot your password?"} callBack={queryLogin} />
    </div>
  );
};
