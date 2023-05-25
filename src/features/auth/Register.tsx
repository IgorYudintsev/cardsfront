import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Form, Inputs } from "common/components/Form";
import { Header } from "common/components/Header";
import React from "react";
import { ArgLoginType, ArgRegisterType } from "features/auth/auth.api";

export const Register = () => {
  const dispatch = useAppDispatch();

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
      <Header />
      <Form title={"Sign up"} callBack={queryRegister} forRegister={true} />
    </div>
  );
};
