import { useAppSelector } from "common/hooks";
import { Navigate } from "react-router-dom";
import { ReactComponentElement } from "react";

type PropsType = {
  children: ReactComponentElement<any>;
};

export const ProtectedRoute: React.FC<PropsType> = ({ children }) => {
  const logined = useAppSelector((state) => state.auth.profile);
  if (!logined) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
