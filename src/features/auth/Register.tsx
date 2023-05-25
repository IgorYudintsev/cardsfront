import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Form, Inputs } from "common/components/Form";
import { Header } from "common/components/Header";
import React from "react";

export const Register = () => {
  const dispatch = useAppDispatch();

  const queryRegister = (payload: Inputs) => {
    dispatch(authThunks.register({ payload }));
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
      <Form title={"Sign up"} callBack={queryRegister} />
      {/*<h1>Register</h1>*/}
      {/*<button onClick={registerHandler}>register</button>*/}
    </div>
  );
};
