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
import "react-toastify/dist/ReactToastify.css";
import { GlobalError } from "common/componentsSmall/GlobalError";
import { ProtectedRoute } from "common/componentsSmall/ProtectedRoute";
import { Header } from "common/componentsBIG/Header";

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
  // {
  //   path: "profile",
  //   element: (
  //     <App disabled={false}>
  //       <Profile />
  //     </App>
  //   ),
  // },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <App disabled={false}>
          <Profile />
        </App>
      </ProtectedRoute>
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
