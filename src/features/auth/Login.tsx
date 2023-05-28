import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Header } from "common/componentsBIG/Header";
import { Form } from "common/componentsBIG/Form";
import { ArgLoginType } from "features/auth/auth.api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);

  if (logined) {
    navigate("/profile");
  }

  const queryLogin = (payload: ArgLoginType) => {
    dispatch(authThunks.login(payload));
  };

  return (
    <div>
      {/*<Header />*/}
      <Form title={"Sign in"} callBack={queryLogin} forRegister={false} />
    </div>
  );
};

//------------------------------------------------------------------------------------------------------------------

// import React from "react";
// import { useAppDispatch } from "app/hooks";
// import { authThunks } from "features/auth/auth.slice";
// import { Header } from "common/componentsBIG/Header";
// import { SubmitHandler, useForm } from "react-hook-form";
// import Paper from "@mui/material/Paper";
// import styled from "styled-componentsBIG";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import FilledInput from "@mui/material/FilledInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import Button from "@mui/material/Button";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Forgotpassword } from "features/auth/Forgotpassword";
//
// type Inputs = {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// };
//
// export const Login = () => {
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };
//
//   // const navigate = useNavigate();
//   // const goToForgotpassword = () => {
//   //   navigate("/forgotpassword");
//   // };
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();
//
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     const payload = {
//       email: data.email, //dollarselephant@gmail.com
//       password: data.password, //12345678
//       rememberMe: data.rememberMe,
//     };
//     dispatch(authThunks.login(payload));
//   };
//
//   return (
//       <div>
//         <Header />
//         <Wrapper>
//           <Paper elevation={2} style={{ width: "350px" }}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <FormWrapper>
//                 <h2 style={{ fontFamily: "Montserrat" }}>Sign in</h2>
//                 <TextField
//                     {...register("email")}
//                     sx={{ m: 1 }}
//                     id="filled-helperText"
//                     label="Email"
//                     defaultValue="Email"
//                     helperText="Please Enter your Login"
//                     variant="filled"
//                 />
//                 <FormControl sx={{ m: 1 }} variant="filled" style={{ marginTop: "20px" }}>
//                   <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
//                   <FilledInput
//                       {...register("password", { required: true })}
//                       id="filled-adornment-password"
//                       type={showPassword ? "text" : "password"}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                               aria-label="toggle password visibility"
//                               onClick={handleClickShowPassword}
//                               onMouseDown={handleMouseDownPassword}
//                               edge="end"
//                           >
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                   />
//                 </FormControl>
//                 <WrapperCheckBox>
//                   <Checkbox defaultChecked {...register("rememberMe")} />
//                   <span style={{ marginTop: "10px" }}>Remember me</span>
//                 </WrapperCheckBox>
//                 <WrapperForgetPassword>
//                   <Link to={"/forgotpassword"}>Forgot password?</Link>
//                 </WrapperForgetPassword>
//                 {/*{errors.password && <span>This field is required</span>} //TODO*/}
//                 <TipicalWrapper>
//                   <Button variant="contained" type="submit">
//                     Sign in
//                   </Button>
//                 </TipicalWrapper>
//
//                 <TipicalWrapper>
//                   <span>Don't have an account?</span>
//                 </TipicalWrapper>
//
//                 <DontHaveAccount>
//                   <Link to={"/register"}>Sign up</Link>
//                 </DontHaveAccount>
//                 {/*<input type="submit" />*/}
//               </FormWrapper>
//             </form>
//           </Paper>
//         </Wrapper>
//       </div>
//   );
// };
//
// const DontHaveAccount = styled.span`
//   margin-top: 10px;
//   padding-bottom: 30px;
//   & > a {
//     color: #036ea4;
//     font-size: 14px;
//   }
// `;
//
// const TipicalWrapper = styled.span`
//   margin-top: 40px;
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

//------------------------------------------------------------------------------------------------------------------

// import React from "react";
// import { useAppDispatch } from "app/hooks";
// import { authThunks } from "features/auth/auth.slice";
// import { Header } from "common/componentsBIG/Header";
// import { SubmitHandler, useForm } from "react-hook-form";
//
// type Inputs = {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// };
//
// export const Login = () => {
//   const dispatch = useAppDispatch();
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();
//
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     const payload = {
//       email: data.email,
//       password: data.password,
//       rememberMe: data.rememberMe,
//     };
//     dispatch(authThunks.login(payload));
//   };
//
//   // if (isAuth) {
//   //   return <Navigate to={'/profile'}/>
//   // }
//
//   // const loginHandler = () => {
//   //   const payload = {
//   //     email: "dollarselephant@gmail.com",
//   //     password: "12345678",
//   //     rememberMe: true,
//   //   };
//   //   dispatch(authThunks.login(payload));
//   // };
//
//   return (
//       <div>
//         <Header />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <input placeholder={"email"} {...register("email")} />
//           </div>
//
//           <div>
//             <input placeholder={"password"} {...register("password", { required: true })} />
//           </div>
//
//           <div>
//             <input type={"checkbox"} {...register("rememberMe")} />
//           </div>
//
//           {errors.password && <span>This field is required</span>}
//
//           <input type="submit" />
//         </form>
//         {/*<button onClick={loginHandler}>login</button>*/}
//       </div>
//   );
// };
