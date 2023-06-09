import { authThunks } from "features/auth/auth.slice";
import { Form } from "common/componentsBIG/Form";
import React from "react";
import { ArgLoginType } from "features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registered = useAppSelector((state) => state.auth.registred);

  if (registered) {
    navigate("/login");
  }
  // const goToForgotpassword = () => {
  //   //   navigate("/forgotpassword");
  //   // };

  const queryRegister = (payload: ArgLoginType) => {
    const payloadWithoutRememberMe = {
      email: payload.email,
      password: payload.password,
    };

    dispatch(authThunks.register(payloadWithoutRememberMe));
  };

  // const registerHandler = () => {
  //   const payload = {
  //     email: "dollarselephant2@gmail.com", developeryudintsev@gmail.com
  //     password: "123456782", 200Dilan-Bars211
  //   };
  //   dispatch(authThunks.register({payload}));
  // };

  return (
    <div>
      <Form title={"Sign up"} callBack={queryRegister} forRegister={true} />
    </div>
  );
};
