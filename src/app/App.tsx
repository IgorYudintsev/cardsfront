import React, { ReactNode, useEffect } from "react";
import "app/App.css";
import { Header } from "common/componentsBIG/Header";
import { LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { appActions } from "app/app.slice";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { Login } from "features/auth/Login";

type AppPropsType = {
  children: ReactNode;
  disabled?: boolean;
};

const App: React.FC<AppPropsType> = (props) => {
  const { children, disabled } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const logined = useAppSelector((state) => state.auth.profile);
  const authMe = useAppSelector((state) => state.auth.profile);

  // useEffect(() => {
  //   if (!logined) {
  //     dispatch(authThunks.authMe());
  //   }
  // }, []);

  // useEffect(() => {
  //   dispatch(authThunks.authMe());
  // }, []);

  // const onClickHandler = () => {
  //   dispatch(authThunks.authMe());
  // };

  // // console.log(authMe);
  // console.log(authMe);

  useEffect(() => {
    dispatch(authThunks.authMe());
  }, []);

  return (
    <div className="App">
      <Header disabled={disabled} />
      {/*<button onClick={onClickHandler}>ff</button>*/}
      {/*{authMe ? <div>OK</div> : <div>!!!!</div>}*/}
      {/*{authMe ? <div>{children}</div> : <div>!!!!</div>}*/}

      {/*{isLoading && <LinearProgress />}*/}

      {children}

      {/*<Counter />*/}
    </div>
  );

  // return (
  //     <div className="App">
  //       {authMe ? <div>ok</div> : <div>!!!!!!</div>}
  //       {/*<Header disabled={disabled} />*/}
  //       {/*{isLoading && <LinearProgress />}*/}
  //       {/*{children}*/}
  //       {/*<Counter />*/}
  //     </div>
  // );
};

export default App;

//-----------------------------------------------
//yarn create react-app cards --template redux-typescript
//yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom
//yarn add --dev --exact prettier
// прописываем в терминале:   echo {}> .prettierrc.json
//в файле:

// yarn add react-toastify  -для обработки ошибок

//-----------------------------------------------------------------------

// import React, { useEffect } from "react";
// import { Counter } from "features/counter/Counter";
// import "app/App.css";
// import { useAppDispatch, useAppSelector } from "app/hooks";
// import { appActions } from "app/app.slice";
// import { Header } from "common/componentsBIG/Header";
//
// function App() {
//   //const isLoading = useAppSelector((state) => state.app.isLoading);
//
//   const dispatch = useAppDispatch();
//
//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(appActions.setIsLoading({ isLoading: false }));
//     }, 3000);
//   }, []);
//
//   return (
//       <div className="App">
//         <Header />
//         {/*{isLoading && <h1>Loader...</h1>}*/}
//         {/*<Counter />*/}
//       </div>
//   );
// }
//
// export default App;
//
// //-----------------------------------------------
// //yarn create react-app cards --template redux-typescript
// //yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom
// //yarn add --dev --exact prettier
// // прописываем в терминале:   echo {}> .prettierrc.json
// //в файле:
//----------------------------------------------------------------------------------------------------

// import React, { ReactNode, useEffect } from "react";
// import "app/App.css";
// import { Header } from "common/componentsBIG/Header";
// import { LinearProgress } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "common/hooks";
// import { appActions } from "app/app.slice";
// import { authThunks } from "features/auth/auth.slice";
// import { useNavigate } from "react-router-dom";
//
// type AppPropsType = {
//   children: ReactNode;
//   disabled?: boolean;
// };
//
// const App: React.FC<AppPropsType> = (props) => {
//   const { children, disabled } = props;
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const isLoading = useAppSelector((state) => state.app.isLoading);
//   const authMe = useAppSelector((state) => state.auth.profile);
//
//   useEffect(() => {
//     dispatch(authThunks.authMe());
//   }, []);
//
//   // if (authMe) {
//   //   navigate("/packs");
//   // }
//
//   return (
//       <div className="App">
//         {authMe ? <div>ok</div> : <div>!!!!!!</div>}
//         {/*<Header disabled={disabled} />*/}
//         {/*{isLoading && <LinearProgress />}*/}
//         {/*{children}*/}
//         {/*<Counter />*/}
//       </div>
//   );
// };
//
// export default App;
