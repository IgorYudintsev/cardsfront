import React, { ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { CheckBox } from "common/componentsSmall/CheckBox";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArgLoginType, ForgetPasswordType } from "features/auth/auth.api";
import { TextInput } from "common/componentsSmall/TextInput";
import { PasswordTextInput } from "common/componentsSmall/PasswordTextInput";

type PropsType = {
  title: string;
  callBack: (payload: ForgetPasswordType) => void;
  forgot: boolean;
};

export type Inputs = {
  email: string;
  password?: string;
};

export const SmallForm: React.FC<PropsType> = (props) => {
  const { title, callBack, forgot } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      email: data.email, // кому восстанавливать пароль
      from: "test-front-admin <nickkolaevn@mail.ru>",
      // можно указать разработчика фронта)
      message: `<div style="background-color: lime; padding: 15px">
    password recovery link:
    <a href='http://localhost:3000/newpas/$token$'>
    link</a>
    </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    };
    callBack(payload);
  };

  return (
    <Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>

            {forgot && (
              <TextInput
                name="email"
                label="Email"
                rules={{ required: "Email is required" }}
                control={control}
                errors={errors.email}
              />
            )}
            <OpacitySpan>Enter your email address and we will send you further instructions </OpacitySpan>

            {/*<PasswordTextInput*/}
            {/*  name={"password"}*/}
            {/*  label={"Password"}*/}
            {/*  rules={{ required: "Password is required" }}*/}
            {/*  control={control}*/}
            {/*  errors={errors.password}*/}
            {/*  passwordsRequire={passwordsRequire}*/}
            {/*/>*/}

            <TipicalWrapper>
              <ButtonComponent variant={"contained"} control={control} buttonName={"Send Instructions"} />
            </TipicalWrapper>

            <TipicalWrapper>
              <span>Did you remember your password?</span>
            </TipicalWrapper>

            <DontHaveAccount>
              <Link to={"/login"}>Try logging in</Link>
            </DontHaveAccount>
          </FormWrapper>
        </form>
      </Paper>
    </Wrapper>
  );
};

const OpacitySpan = styled.span`
  opacity: 0.5;
  text-align: left;
  margin-left: 10px;
`;

const DontHaveAccount = styled.span`
  margin-top: 10px;
  padding-bottom: 30px;

  & > a {
    color: #036ea4;
    font-size: 14px;
  }
`;

const TipicalWrapper = styled.span`
  margin-top: 40px;

  & > button {
    width: 96%;
  }
`;

const Wrapper = styled.span`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
`;

const WrapperForgetPassword = styled.span`
  display: flex;
  justify-content: end;
  margin-right: 10px;
  cursor: pointer;

  & > a {
    text-decoration: none;
    color: black;
  }
`;

const FormWrapper = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
