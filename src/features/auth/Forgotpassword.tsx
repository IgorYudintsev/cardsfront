import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SmallForm } from "common/componentsBIG/SmallForm";
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
      <SmallForm title={"Forgot your password?"} callBack={queryLogin} forgot={true} />
    </div>
  );
};
