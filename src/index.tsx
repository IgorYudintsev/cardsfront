import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import App from "app/App";
import { store } from "app/store";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Login } from "features/auth/Login";
import { Register } from "features/auth/Register";
import { Profile } from "features/packs/Profile";
import { Forgotpassword } from "features/auth/Forgotpassword";
import { SetNewPassword } from "features/auth/SetNewPassword";
import { CheckEmail } from "features/auth/CheckEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" replace />,
  },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "register",
    element: (
      <App disabled={true}>
        <Register />
      </App>
    ),
  },
  {
    path: "profile",
    element: (
      <App disabled={false}>
        <Profile />
      </App>
    ),
  },
  {
    path: "forgot",
    element: (
      <App disabled={false}>
        <Forgotpassword />
      </App>
    ),
  },
  {
    path: "newpas/:token",
    element: (
      <App disabled={false}>
        <SetNewPassword />
      </App>
    ),
  },
  {
    path: "check",
    element: (
      <App disabled={false}>
        <CheckEmail />
      </App>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();

//---------------------------------------------------------------------------------
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// import App from "app/App";
// import { createRoot } from "react-dom/client";
// import { Login } from "features/auth/Login";
// import { store } from "app/store";
// import { Provider } from "react-redux";
//
// const container = document.getElementById("root")!;
// const root = createRoot(container);
//
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="login" element={<Login />} />
//     </Route>
//   )
// );
//
// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <App />,
// //     children: [
// //       {
// //         path: "login",
// //         element: <Login />,
// //       },
// //     ],
// //   },
// // ]);
//
// root.render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
// );

//-------------------------------------------------------
//
// import React from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from "app/App";
// import reportWebVitals from "./reportWebVitals";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Forgotpassword } from "features/auth/Forgotpassword";
// import { Profile } from "features/packs/Profile";
// import { Packs } from "features/packs/Packs";
// import { Cards } from "features/packs/Cards";
// import { Learn } from "features/packs/Learn";
// import { Login } from "features/auth/Login";
// import { Register } from "features/auth/Register";
// import { SetNewPassword } from "features/auth/SetNewPassword";
// import { CheckEmail } from "features/packs/CheckEmail";
//
// const container = document.getElementById("root")!;
// const root = createRoot(container);
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div></div>,
//   },
//   {
//     path: "/forgotpassword",
//     element: <Forgotpassword />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/packs",
//     element: <Packs />,
//   },
//   {
//     path: "/cards",
//     element: <Cards />,
//   },
//   {
//     path: "/learn",
//     element: <Learn />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/setnewpassword",
//     element: <SetNewPassword />,
//   },
//   {
//     path: "/checkEmail",
//     element: <CheckEmail />,
//   },
// ]);
//
// root.render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
