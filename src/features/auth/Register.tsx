import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Form, Inputs } from "common/componentsBIG/Form";
import { Header } from "common/componentsBIG/Header";
import React from "react";
import { ArgLoginType, ArgRegisterType } from "features/auth/auth.api";
import { useNavigate } from "react-router-dom";

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
    // console.log(payload);
    dispatch(authThunks.register({ payload: payloadWithoutRememberMe }));
  };

  // const registerHandler = () => {
  //   const payload = {
  //     email: "dollarselephant2@gmail.com",
  //     password: "123456782",
  //   };
  //   dispatch(authThunks.register({payload}));
  // };

  return (
    <div>
      {/*<Header />*/}
      <Form title={"Sign up"} callBack={queryRegister} forRegister={true} />
    </div>
  );
};
