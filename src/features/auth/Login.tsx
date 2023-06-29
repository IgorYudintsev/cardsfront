import React, { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { Form } from "common/componentsBIG/Form";
import { ArgLoginType, authApi } from "features/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);
  const authMe = useAppSelector((state) => state.auth.profile);

  // useEffect(() => {
  //   dispatch(authThunks.authMe());
  // }, []);

  if (authMe) {
    navigate("/packs");
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
// import { authThunks } from "features/auth/auth.slice";
// import { Form } from "common/componentsBIG/Form";
// import { ArgLoginType } from "features/auth/auth.api";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "common/hooks";
// import { toast } from "react-toastify";
//
// export const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const logined = useAppSelector((state) => state.auth.profile);
//
//
//   if (logined) {
//     navigate("/profile");
//   }
//
//   const queryLogin = (payload: ArgLoginType) => {
//     //dispatch(authThunks.login(payload));
//     //к каждой санке можно прикрутить then
//     dispatch(authThunks.login(payload))
//         .unwrap() //благодаря unwrap() -мы отрабатываем положительные или отрицательные кейсы
//         .then((res) => {
//           toast.success("Вы успешно залогинились");
//         })
//         .catch((err) => {
//           // toast.error("Залогиниться не удалось");
//         });
//   };
//
//   return (
//       <div>
//         <Form title={"Sign in"} callBack={queryLogin} forRegister={false} />
//       </div>
//   );
// };

//-----------------------------------------------------------------------------------
