import { useAppSelector } from "common/hooks";
import { Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";

type PropsType = {
  children: any;
};

export const ProtectedRoute: React.FC<PropsType> = ({ children }) => {
  const logined = useAppSelector((state) => state.auth.profile);
  if (!logined) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
