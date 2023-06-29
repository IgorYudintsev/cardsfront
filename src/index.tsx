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
import { Profile } from "features/auth/Profile";
import { Forgotpassword } from "features/auth/Forgotpassword";
import { SetNewPassword } from "features/auth/SetNewPassword";
import { CheckEmail } from "features/auth/CheckEmail";
import "react-toastify/dist/ReactToastify.css";
import { GlobalError } from "common/componentsSmall/GlobalError";
import { ProtectedRoute } from "common/componentsSmall/ProtectedRoute";
import { Header } from "common/componentsBIG/Header";
import { Cards } from "features/cards/Cards";
import { Packs } from "features/packs/Packs";
import { useAppSelector } from "common/hooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  // {
  //   path: "/",
  //   element: <Navigate to="login" replace />,
  // },
  // {
  //   path: "/",
  //   element: (
  //     <App>
  //       <Login />
  //     </App>
  //   ),
  // },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "/register",
    element: (
      <App disabled={true}>
        <Register />
      </App>
    ),
  },
  {
    path: "/forgot",
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
    path: "/check",
    element: (
      <App disabled={false}>
        <CheckEmail />
      </App>
    ),
  },
  // {
  //   path: "profile",
  //   element: (
  //     <App disabled={false}>
  //       <Profile />
  //     </App>
  //   ),
  // },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <App disabled={false}>
          <Profile />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/packs",
    element: (
      <ProtectedRoute>
        {/*<App disabled={false}>*/}
        <Packs />
        {/*</App>*/}
      </ProtectedRoute>
    ),
  },
  {
    path: "/cards",
    element: (
      <App disabled={false}>
        <Cards />
      </App>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <GlobalError />
  </Provider>
);

reportWebVitals();
