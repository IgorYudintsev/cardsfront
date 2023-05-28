import React, { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks } from "features/auth/auth.slice";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { ArgLoginType, ArgRegisterType } from "features/auth/auth.api";
import { TextInput } from "common/componentsSmall/TextInput";
import { PasswordTextInput } from "common/componentsSmall/PasswordTextInput";

type PropsType = {
  title: string;
  callBack: (payload: ArgLoginType) => void;
  forRegister: boolean;
};

export type Inputs = {
  email: string;
  password: string;
  password2?: string;
  rememberMe: boolean;
};

export const Form: React.FC<PropsType> = (props) => {
  const { title, callBack, forRegister } = props;
  const [passwordsRequire, setPasswordsRequire] = useState(true);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      email: data.email, //dollarselephant@gmail.com
      password: data.password, //12345678
      rememberMe: data.rememberMe,
    };
    if (!forRegister) {
      callBack(payload);
    }
    if (forRegister && data.password === data.password2) {
      setPasswordsRequire(true);
      callBack(payload);
    }
    if (forRegister && data.password !== data.password2) {
      setPasswordsRequire(false);
    }
  };

  return (
    <Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>

            <TextInput
              name="email"
              label="Email"
              rules={{ required: "Email is required" }}
              control={control}
              errors={errors.email}
            />

            <PasswordTextInput
              name={"password"}
              label={"Password"}
              rules={{ required: "Password is required" }}
              control={control}
              errors={errors.password}
              passwordsRequire={passwordsRequire}
            />

            {forRegister && (
              <PasswordTextInput
                name={"password2"}
                label={"Password"}
                rules={{ required: "Password is required" }}
                control={control}
                errors={errors.password2}
                passwordsRequire={passwordsRequire}
              />
            )}

            {!forRegister && (
              <WrapperCheckBox>
                <Checkbox defaultChecked {...register("rememberMe")} />
                <span style={{ marginTop: "10px" }}>Remember me</span>
              </WrapperCheckBox>
            )}

            <WrapperForgetPassword>
              <Link to={"/forgotpassword"}>Forgot password?</Link>
            </WrapperForgetPassword>

            <TipicalWrapper>
              <Button variant="contained" type="submit">
                Sign in
              </Button>
            </TipicalWrapper>

            <TipicalWrapper>
              <span>Don't have an account?</span>
            </TipicalWrapper>

            <DontHaveAccount>
              <Link to={"/register"}>Sign up</Link>
            </DontHaveAccount>
            {/*<input type="submit" />*/}
          </FormWrapper>
        </form>
      </Paper>
    </Wrapper>
  );
};

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

const WrapperCheckBox = styled.span`
  display: flex;
  text-align: left;
`;

const FormWrapper = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

//------------------------------------------------------------------------
// import React, { useState } from "react";
// import { useAppDispatch } from "app/hooks";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { authThunks } from "features/auth/auth.slice";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import FilledInput from "@mui/material/FilledInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Visibility from "@mui/icons-material/Visibility";
// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";
// import styled from "styled-components";
// import { ArgLoginType, ArgRegisterType } from "features/auth/auth.api";
// import { TextInput } from "common/componentsSmall/TextInput";
//
// type PropsType = {
//   title: string;
//   callBack: (payload: ArgLoginType) => void;
//   forRegister: boolean;
// };
//
// export type Inputs = {
//   email: string;
//   password: string;
//   password2?: string;
//   rememberMe: boolean;
// };
//
// export const Form: React.FC<PropsType> = (props) => {
//   const { title, callBack, forRegister } = props;
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const [passwordsRequire, setPasswordsRequire] = useState(true);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };
//   const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };
//
//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();
//
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     console.log(data);
//     const payload = {
//       email: data.email, //dollarselephant@gmail.com
//       password: data.password, //12345678
//       rememberMe: data.rememberMe,
//     };
//     if (!forRegister) {
//       callBack(payload);
//     }
//     if (forRegister && data.password === data.password2) {
//       setPasswordsRequire(true);
//       callBack(payload);
//       console.log("OK");
//     }
//     if (forRegister && data.password !== data.password2) {
//       setPasswordsRequire(false);
//       console.log("STOP!");
//     }
//   };
//
//   return (
//       <Wrapper>
//         <Paper elevation={2} style={{ width: "350px" }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <FormWrapper>
//               <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>
//
//               <TextInput name="email" label="email" rules={{ required: "Email is required" }} control={control} />
//
//               {/*<TextField*/}
//               {/*  {...register("email")}*/}
//               {/*  sx={{ m: 1 }}*/}
//               {/*  id="filled-helperText"*/}
//               {/*  label="Email"*/}
//               {/*  defaultValue="Email"*/}
//               {/*  helperText="Please Enter your Login"*/}
//               {/*  variant="filled"*/}
//               {/*/>*/}
//
//               <FormControl sx={{ m: 1 }} variant="filled" style={{ marginTop: "20px" }}>
//                 <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
//                 <FilledInput
//                     {...register("password", { required: true })}
//                     id="filled-adornment-password"
//                     type={showPassword ? "text" : "password"}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                             edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                 />
//                 {errors.password && <span style={{ color: "red" }}>This field is required</span>}
//                 {!passwordsRequire && <div style={{ color: "red" }}>Passwords do not match</div>}
//               </FormControl>
//
//               {forRegister && (
//                   <FormControl sx={{ m: 1 }} variant="filled" style={{ marginTop: "20px" }}>
//                     <InputLabel htmlFor="filled-adornment-password"> REPEAT Password</InputLabel>
//                     <FilledInput
//                         {...register("password2", { required: true })}
//                         id="filled-adornment-password"
//                         type={showPassword2 ? "text" : "password"}
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleClickShowPassword2}
//                                 onMouseDown={handleMouseDownPassword2}
//                                 edge="end"
//                             >
//                               {showPassword2 ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                     />
//                     {errors.password2 && <span style={{ color: "red" }}>This field is required</span>}
//                     {!passwordsRequire && <div style={{ color: "red" }}>Passwords do not match</div>}
//                   </FormControl>
//               )}
//
//               {!forRegister && (
//                   <WrapperCheckBox>
//                     <Checkbox defaultChecked {...register("rememberMe")} />
//                     <span style={{ marginTop: "10px" }}>Remember me</span>
//                   </WrapperCheckBox>
//               )}
//
//               <WrapperForgetPassword>
//                 <Link to={"/forgotpassword"}>Forgot password?</Link>
//               </WrapperForgetPassword>
//
//               <TipicalWrapper>
//                 <Button variant="contained" type="submit">
//                   Sign in
//                 </Button>
//               </TipicalWrapper>
//
//               <TipicalWrapper>
//                 <span>Don't have an account?</span>
//               </TipicalWrapper>
//
//               <DontHaveAccount>
//                 <Link to={"/register"}>Sign up</Link>
//               </DontHaveAccount>
//               {/*<input type="submit" />*/}
//             </FormWrapper>
//           </form>
//         </Paper>
//       </Wrapper>
//   );
// };
//
// const DontHaveAccount = styled.span`
//   margin-top: 10px;
//   padding-bottom: 30px;
//
//   & > a {
//     color: #036ea4;
//     font-size: 14px;
//   }
// `;
//
// const TipicalWrapper = styled.span`
//   margin-top: 40px;
//
//   & > button {
//     width: 96%;
//   }
// `;
//
// const Wrapper = styled.span`
//   margin-top: 50px;
//   display: flex;
//   justify-content: space-around;
// `;
//
// const WrapperForgetPassword = styled.span`
//   display: flex;
//   justify-content: end;
//   margin-right: 10px;
//   cursor: pointer;
//
//   & > a {
//     text-decoration: none;
//     color: black;
//   }
// `;
//
// const WrapperCheckBox = styled.span`
//   display: flex;
//   text-align: left;
// `;
//
// const FormWrapper = styled.span`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
// `;
