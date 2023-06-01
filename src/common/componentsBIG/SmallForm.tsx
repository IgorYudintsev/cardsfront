import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { ButtonComponentForm } from "common/componentsSmall/ButtonComponentForm";
import { Link } from "react-router-dom";
import { ForgetPasswordType } from "features/auth/auth.api";
import { TextInput } from "common/componentsSmall/TextInput";
import { PasswordTextInput } from "common/componentsSmall/PasswordTextInput";
import { S } from "./Form_styles";

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
    <S.Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormWrapper>
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
            <S.OpacitySpan>Enter your email address and we will send you further instructions </S.OpacitySpan>

            {/*<PasswordTextInput*/}
            {/*  name={"password"}*/}
            {/*  label={"Password"}*/}
            {/*  rules={{ required: "Password is required" }}*/}
            {/*  control={control}*/}
            {/*  errors={errors.password}*/}
            {/*  passwordsRequire={passwordsRequire}*/}
            {/*/>*/}

            <S.TipicalWrapper>
              <ButtonComponentForm variant={"contained"} control={control} buttonName={"Send Instructions"} />
            </S.TipicalWrapper>

            <S.TipicalWrapper>
              <span>Did you remember your password?</span>
            </S.TipicalWrapper>

            <S.DontHaveAccount>
              <Link to={"/login"}>Try logging in</Link>
            </S.DontHaveAccount>
          </S.FormWrapper>
        </form>
      </Paper>
    </S.Wrapper>
  );
};
