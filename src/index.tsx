import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Forgotpassword } from "features/auth/Forgotpassword";
import { Profile } from "features/packs/Profile";
import { Packs } from "features/packs/Packs";
import { Cards } from "features/packs/Cards";
import { Learn } from "features/packs/Learn";
import { Login } from "features/auth/Login";
import { Register } from "features/auth/Register";
import { SetNewPassword } from "features/auth/SetNewPassword";
import { CheckEmail } from "features/packs/CheckEmail";
import { Header } from "common/componentsBIG/Header";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/packs",
    element: <Packs />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setnewpassword",
    element: <SetNewPassword />,
  },
  {
    path: "/checkEmail",
    element: <CheckEmail />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
