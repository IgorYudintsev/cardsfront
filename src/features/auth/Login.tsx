import React from "react";
import { authThunks } from "features/auth/auth.slice";
import { Form } from "common/componentsBIG/Form";
import { ArgLoginType } from "features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);

  if (logined) {
    navigate("/profile");
  }

  const queryLogin = (payload: ArgLoginType) => {
    //dispatch(authThunks.login(payload));
    //к каждой санке можно прикрутить then
    dispatch(authThunks.login(payload))
      .unwrap() //благодаря unwrap() -мы отрабатываем положительные или отрицательные кейсы
      .then((res) => {
        toast.success("Вы успешно залогинились");
      })
      .catch((err) => {
        // toast.error("Залогиниться не удалось");
      });
  };

  return (
    <div>
      <Form title={"Sign in"} callBack={queryLogin} forRegister={false} />
    </div>
  );
};

//-----------------------------------------------------------------------------------
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
